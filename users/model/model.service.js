"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const model_entity_1 = require("./entities/model.entity");
const user_role_enum_1 = require("../../enums/user-role.enum");
const status_model_enum_1 = require("../../enums/status-model.enum");
const mail_service_1 = require("../../mail/mail.service");
const client_entity_1 = require("../client/entities/client.entity");
const user_state_enum_1 = require("../../enums/user-state.enum");
let ModelService = class ModelService {
    constructor(modelRepository, clientRepository, jwtService, mailService) {
        this.modelRepository = modelRepository;
        this.clientRepository = clientRepository;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async isEmailClientExist(email) {
        return await this.modelRepository.findOne({ email });
    }
    async register(modelData) {
        const verifyModel = await this.modelRepository.findOne({ pseudo: modelData.pseudo });
        if (verifyModel)
            return {
                message: "Le pseudo est déjà utilisé",
                error: true,
                pseudo: true
            };
        const verifyEmail = await this.clientRepository.findOne({ email: modelData.email });
        if (verifyEmail) {
            return {
                message: "L'\tadresse email existe déjà",
                error: true,
                email: true
            };
        }
        const model = await this.modelRepository.create(Object.assign({}, modelData));
        model.salt = await bcrypt.genSalt();
        model.password = await bcrypt.hash(model.password, model.salt);
        try {
            const payload = {
                id: model.id,
                email: model.email,
                role: model.role,
                pseudo: model.pseudo
            };
            const jwt = await this.jwtService.sign(payload);
            await this.mailService.confirmRegisterModel(model.email, model.pseudo, jwt);
            await this.modelRepository.save(model);
        }
        catch (error) {
            if (error.errno && error.errno == 1062)
                return {
                    message: "L'\tadresse email existe déjà",
                    error: true,
                    email: true
                };
            throw new common_1.InternalServerErrorException('Une erreur s\'est produite');
        }
        return {
            id: model.id,
            pseudo: model.pseudo,
            email: model.email,
            password: model.password
        };
    }
    async login(credentials) {
        const { pseudo, password } = credentials;
        const model = await this.modelRepository.createQueryBuilder("model")
            .where("model.email = :pseudo", {
            pseudo
        }).getOne();
        if (!model) {
            return {
                message: "Email ou mot de passe erronée",
                error: true
            };
        }
        if (model.state === user_state_enum_1.UserStateEnum.WAITING) {
            return {
                message: "Votre compte est en cours de validation",
                error: true
            };
        }
        if (model.state === user_state_enum_1.UserStateEnum.DEACTIVATE) {
            return {
                message: "Votre compte a été désactivé",
                error: true
            };
        }
        if (model.state === user_state_enum_1.UserStateEnum.DELETED) {
            return {
                message: "Votre compte a été supprimé",
                error: true
            };
        }
        if (model.state === user_state_enum_1.UserStateEnum.BLOCKED) {
            return {
                message: "Votre compte a été bloqué par l\'administrateur",
                error: true
            };
        }
        const hashPassword = await bcrypt.hash(password, model.salt);
        if (hashPassword === model.password) {
            const payload = {
                id: model.id,
                pseudo: model.pseudo,
                email: model.email,
                role: model.role
            };
            const jwt = await this.jwtService.sign(payload);
            return {
                "access_token": jwt
            };
        }
        else {
            return {
                message: "Pseudo ou mot de passe erronée",
                error: true
            };
        }
    }
    async changePseudo(model, data) {
        const id = model.id;
        await this.modelRepository.update(id, { pseudo: data.pseudo });
        const payload = {
            id: model.id,
            pseudo: data.pseudo,
            email: model.email,
            role: model.role
        };
        const jwt = await this.jwtService.sign(payload);
        return {
            "access_token": jwt,
            id: model.id
        };
    }
    isOwnerOrAdmin(object, model) {
        return (model.role === user_role_enum_1.UserRoleEnum.ADMIN || (object.model && object.model.id === model.id));
    }
    async getModel(id) {
        return await this.modelRepository.findOne({ id });
    }
    async getInfoModel(id) {
        const model = await this.modelRepository.findOne({ id });
        if (!model)
            return null;
        const { setting, credit, password, salt, role } = model, result = __rest(model, ["setting", "credit", "password", "salt", "role"]);
        return result;
    }
    async getInfos(model) {
        const id = model.id;
        const result = await this.modelRepository.findOne({ id });
        if (!model)
            return null;
        const { password, salt, setting, credit } = result, info = __rest(result, ["password", "salt", "setting", "credit"]);
        return info;
    }
    async updateModel(id, model) {
        const newModel = await this.modelRepository.preload(Object.assign({ id }, model));
        return await this.modelRepository.save(newModel);
    }
    async updatePartialModel(updateCriteria, info) {
        return await this.modelRepository.update(updateCriteria, info);
    }
    async changePassword(credentials, model) {
        const { oldPassword, newPassword } = credentials;
        const newModel = await this.modelRepository.findOne(model);
        const hashPassword = await bcrypt.hash(oldPassword, newModel.salt);
        if (hashPassword === newModel.password) {
            newModel.salt = await bcrypt.genSalt();
            newModel.password = await bcrypt.hash(newPassword, newModel.salt);
            await this.modelRepository.save(newModel);
            return {
                message: "Mot de passe reinitialisé",
                success: true
            };
        }
        else {
            return {
                message: "Mot de passe erronée",
                error: true
            };
        }
    }
    async getListModel(data) {
        const models = [];
        await (await this.modelRepository.find()).forEach((model) => {
            if (model.profile) {
                if (data.context === status_model_enum_1.StatusModelEnum.LIVE) {
                    if ((model.profile.status === status_model_enum_1.StatusModelEnum.LIVE_VIP) ||
                        (model.profile.status === status_model_enum_1.StatusModelEnum.LIVE_TIPS) ||
                        (model.profile.status === status_model_enum_1.StatusModelEnum.LIVE_CHOICE)) {
                        const { password, salt, setting, credit } = model, result = __rest(model, ["password", "salt", "setting", "credit"]);
                        models.push(result);
                    }
                }
                if (model.profile.status === data.context) {
                    const { password, salt, setting, credit } = model, result = __rest(model, ["password", "salt", "setting", "credit"]);
                    models.push(result);
                }
            }
        });
        return models.slice(data.begin, data.end);
    }
    async getTotalModel() {
        let live = 0;
        let chat = 0;
        let offline = 0;
        await (await this.modelRepository.find()).forEach((model) => {
            if (model.profile) {
                if ((model.profile.status === status_model_enum_1.StatusModelEnum.LIVE) || (model.profile.status === status_model_enum_1.StatusModelEnum.LIVE_VIP)
                    || (model.profile.status === status_model_enum_1.StatusModelEnum.LIVE_TIPS) || (model.profile.status === status_model_enum_1.StatusModelEnum.LIVE_CHOICE))
                    live++;
                if (model.profile.status === status_model_enum_1.StatusModelEnum.INLINE)
                    chat++;
                if (model.profile.status === status_model_enum_1.StatusModelEnum.OFFLINE)
                    offline++;
            }
        });
        return {
            live,
            chat,
            offline
        };
    }
    async reinitRoom(id) {
        const rooms = await (await this.modelRepository.findOne({ id })).rooms;
    }
    async forgot(data) {
        const client = await this.modelRepository.findOne({ email: data.email });
        if (!client) {
            return {
                success: false,
                message: 'Email non enregistré sur betweenUs'
            };
        }
        const payload = {
            id: client.id,
            email: client.email,
            role: client.role,
            pseudo: client.pseudo
        };
        const jwt = await this.jwtService.sign(payload);
        await this.mailService.forgotPassClient(client.email, client.pseudo, jwt);
        return {
            success: true,
            message: 'Email de reinitialisation envoyé'
        };
    }
    async reinitPassword(data) {
        const id = data.id;
        const model = await this.modelRepository.preload({
            id
        });
        if (!model) {
            return null;
        }
        const hashPassword = await bcrypt.hash(data.newPassword, model.salt);
        model.password = hashPassword;
        await this.modelRepository.save(model);
        const payload = {
            id: model.id,
            email: model.email,
            role: model.role,
            pseudo: model.pseudo
        };
        const jwt = await this.jwtService.sign(payload);
        return {
            "access_token": jwt
        };
    }
    async getLive() {
        const models = [];
        await (await this.modelRepository.find()).forEach((model) => {
            if (model.profile && model.state === user_state_enum_1.UserStateEnum.VALIDATE) {
                if ((model.profile.status === status_model_enum_1.StatusModelEnum.LIVE_VIP) || (model.profile.status === status_model_enum_1.StatusModelEnum.LIVE)
                    || (model.profile.status === status_model_enum_1.StatusModelEnum.LIVE_TIPS) || (model.profile.status === status_model_enum_1.StatusModelEnum.LIVE_CHOICE)) {
                    const { password, salt, setting, credit } = model, result = __rest(model, ["password", "salt", "setting", "credit"]);
                    models.push(result);
                }
            }
        });
        return models;
    }
    async getNotLive() {
        const models = [];
        await (await this.modelRepository.find()).forEach((model) => {
            if (model.profile && model.state === user_state_enum_1.UserStateEnum.VALIDATE) {
                if ((model.profile.status === status_model_enum_1.StatusModelEnum.INLINE) || (model.profile.status === status_model_enum_1.StatusModelEnum.OFFLINE)) {
                    const { password, salt, setting, credit } = model, result = __rest(model, ["password", "salt", "setting", "credit"]);
                    models.push(result);
                }
            }
        });
        return models;
    }
    async requestModel(idClient, motif) {
        const model = await this.modelRepository.findOne({ id: idClient });
        if (!model) {
            return {
                error: true,
                message: 'Modèle inexistant'
            };
        }
        if (motif === 'Suppression') {
            await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.DELETING });
        }
        if (motif === 'Desactivation') {
            await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.DEACTIVATING });
        }
        return {
            success: true
        };
    }
    async countClients(motif) {
        const qb = this.modelRepository.createQueryBuilder('client');
        const exclus = 'Bloque';
        if (motif === 'tous') {
            return await qb.select()
                .where("state != :motif", { motif: exclus })
                .getCount();
        }
        return await qb.select()
            .where("state = :motif", { motif: motif })
            .getCount();
    }
    async countClientBlocked() {
        const qb = this.modelRepository.createQueryBuilder('client');
        const motif = 'Bloque';
        return await qb.select()
            .where("state = :motif", { motif: motif })
            .getCount();
    }
    async getAllClientBlocked(range, page, filter) {
        const qb = this.modelRepository.createQueryBuilder('client');
        const motif = 'Bloque';
        if (filter) {
            return await qb.select()
                .where("(pseudo like :filter or email like :filter) and state = :motif", { filter: '%' + filter + '%', motif: motif })
                .offset(range * page)
                .limit(range)
                .getMany();
        }
        return await qb.select()
            .where("state = :motif", { motif: motif })
            .offset(range * page)
            .limit(range)
            .getMany();
    }
    async getAllClients(motif, range, page, filter) {
        const qb = this.modelRepository.createQueryBuilder('client');
        if (!filter) {
            if (motif === 'tous') {
                const exclus = 'Bloque';
                return await qb.select()
                    .leftJoinAndSelect("client.profile", "profile")
                    .where("state != :motif", { motif: exclus })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
            else {
                return await qb.select()
                    .leftJoinAndSelect("client.profile", "profile")
                    .where("state = :motif", { motif: motif })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
        }
        else {
            if (motif === 'tous') {
                return await qb.select()
                    .leftJoinAndSelect("client.profile", "profile")
                    .where("(pseudo like :filter or email like :filter)", { filter: '%' + filter + '%', motif: motif })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
            else {
                return await qb.select()
                    .leftJoinAndSelect("client.profile", "profile")
                    .where("(pseudo like :filter or email like :filter) and state = :motif", { filter: '%' + filter + '%', motif: motif })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
        }
    }
    async deleteClient(idClient) {
        const user = await this.modelRepository.findOne({ id: idClient });
        if (!user) {
            return {
                error: true,
                message: 'modèle inexistant'
            };
        }
        await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.DELETED });
        return {
            success: true,
            message: `Compte modèle d\'id ${idClient} a été supprimé`
        };
    }
    async blockClient(idClient, reverse) {
        const user = await this.modelRepository.findOne({ id: idClient });
        if (!user) {
            return {
                error: true,
                message: 'modèle inexistant'
            };
        }
        if (reverse) {
            await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.VALIDATE });
        }
        else {
            await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.BLOCKED });
        }
        return {
            success: true,
            message: `Compte modèle d\'id ${idClient} a été bloqué`
        };
    }
    async deactivateClient(idClient) {
        const user = await this.modelRepository.findOne({ id: idClient });
        if (!user) {
            return {
                error: true,
                message: 'Modèle inexistant'
            };
        }
        await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.DEACTIVATE });
        return {
            success: true,
            message: `Compte modèle d\'id ${idClient} a été désactivé`
        };
    }
    async activateClient(idClient) {
        const user = await this.modelRepository.findOne({ id: idClient });
        if (!user) {
            return {
                error: true,
                message: 'Modèle inexistant'
            };
        }
        await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.VALIDATE });
        return {
            success: true,
            message: `Compte modèle d\'id ${idClient} a été activé`
        };
    }
    async statInscriptionClient() {
        const qb = this.modelRepository.createQueryBuilder('client');
        return await qb.select("date(client.createdAt) as date, count(client.id) as count")
            .groupBy("date(client.createdAt)")
            .getRawMany();
    }
    async statSuppressionModel() {
        const qb = this.modelRepository.createQueryBuilder('client');
        return await qb.select("date(client.createdAt) as date, count(client.id) as count")
            .where('state = :deleted', { deleted: 'Supprime' })
            .groupBy("date(client.createdAt)")
            .getRawMany();
    }
    async getModelProfil(status, filter) {
        const qb = this.modelRepository.createQueryBuilder('client');
        if (filter) {
            return await qb.select()
                .leftJoinAndSelect("client.profile", "profile")
                .where("pseudo like :filter and profile.status = :status", { filter: '%' + filter + '%', status: status })
                .getMany();
        }
        else {
            return await qb.select()
                .leftJoinAndSelect("client.profile", "profile")
                .where("profile.status = :status", { status: status })
                .getMany();
        }
    }
    async countRequestsModel() {
        const waiting = 'En attente';
        const deleting = 'Suppression';
        const deactivating = 'Desactivation';
        const qb = this.modelRepository.createQueryBuilder('client');
        return await qb.select()
            .where("state = :waiting or state = :deleting or state = :deactivating", { waiting: waiting, deleting: deleting, deactivating: deactivating })
            .getCount();
    }
    async getAllRequestsModel(motif, range, page, filter) {
        const waiting = 'En attente';
        const deleting = 'Suppression';
        const deactivating = 'Desactivation';
        const qb = this.modelRepository.createQueryBuilder('client');
        if (filter) {
            if (motif == 'tous') {
                return await qb.select()
                    .where("pseudo like :filter and (state = :waiting or state = :deleting or state = :deactivating)", { filter: '%' + filter + '%', waiting: waiting, deleting: deleting, deactivating: deactivating })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
            return await qb.select()
                .where("pseudo like :filter and state = :motif", { filter: '%' + filter + '%', motif: motif })
                .offset(range * page)
                .limit(range)
                .getMany();
        }
        else {
            if (motif == 'tous') {
                return await qb.select()
                    .where("state = :waiting or state = :deleting or state = :deactivating", { waiting: waiting, deleting: deleting, deactivating: deactivating })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
            return await qb.select()
                .where("state = :motif", { motif: motif })
                .offset(range * page)
                .limit(range)
                .getMany();
        }
    }
    async resultRequestModel(idClient, accepted) {
        const model = await this.modelRepository.findOne({ id: idClient });
        if (!model) {
            return {
                error: true,
                message: 'Model inexistant'
            };
        }
        if (accepted) {
            if (model.state === 'Suppression') {
                await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.DELETED });
                await this.mailService.acceptRequestModel(model.email, model.pseudo, model.state);
            }
            else if (model.state === 'Desactivation') {
                await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.DEACTIVATE });
                await this.mailService.acceptRequestModel(model.email, model.pseudo, model.state);
            }
        }
        else {
            if (model.state === 'Suppression') {
                await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.VALIDATE });
                await this.mailService.rejectRequestModel(model.email, model.pseudo, model.state);
            }
            else if (model.state === 'Desactivation') {
                await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.VALIDATE });
                await this.mailService.rejectRequestModel(model.email, model.pseudo, model.state);
            }
        }
        return {
            success: true
        };
    }
    async resultInscriptionModel(idClient, accepted, motif) {
        const model = await this.modelRepository.findOne({ id: idClient });
        if (model.state !== 'En attente')
            return { error: true, message: 'Compte opérationnel' };
        if (accepted) {
            await this.mailService.acceptInscriptionModel(model.email, model.pseudo);
            await this.modelRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.VALIDATE });
        }
        else {
            await this.mailService.rejectInscriptionModel(model.email, model.pseudo, motif);
            await this.modelRepository.delete(idClient);
        }
        return {
            success: true
        };
    }
    async getInfosModel(idClient) {
        return await this.modelRepository.findOne({ id: idClient });
    }
    async countModelActif() {
        const qb = this.modelRepository.createQueryBuilder('client');
        const actif = 'Valide';
        return await qb.select()
            .where('state = :actif', { actif: actif })
            .getCount();
    }
    async countModelState(state) {
        const qb = this.modelRepository.createQueryBuilder('client');
        const actif = 'Valide';
        return await qb.select()
            .where('state = :state', { state: state })
            .getCount();
    }
    async newLastModels() {
        let actual = new Date();
        let currentMonth = actual.getMonth() + 1;
        let currentYear = actual.getFullYear();
        const qb = this.modelRepository.createQueryBuilder('client');
        const actif = 'Valide';
        return await qb.select()
            .where('state = :actif and month(createdAt) = :currentMonth and year(createdAt) = :currentYear', { actif: actif, currentMonth: currentMonth, currentYear: currentYear })
            .getCount();
    }
    async getTop10Model() {
        const qb = this.modelRepository.createQueryBuilder('client');
        return await qb.select()
            .innerJoinAndSelect('client.credit', 'credit')
            .innerJoinAndSelect('client.privateRooms', 'privateRooms')
            .innerJoinAndSelect('client.vipRooms', 'vipRooms')
            .innerJoinAndSelect('client.tipsRooms', 'tipsRooms')
            .orderBy('credit.credit')
            .getMany();
    }
    async getModelsActif() {
        const actif = 'Valide';
        const qb = this.modelRepository.createQueryBuilder('client');
        return await qb.select()
            .where('state = :actif', { actif: actif })
            .innerJoinAndSelect('client.credit', 'credit')
            .getMany();
    }
    async getCreditActifsModels() {
        return await this.modelRepository.find({ state: 'Valide' });
    }
};
ModelService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(model_entity_1.ModelEntity)),
    __param(1, typeorm_1.InjectRepository(client_entity_1.ClientEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        mail_service_1.MailService])
], ModelService);
exports.ModelService = ModelService;
//# sourceMappingURL=model.service.js.map