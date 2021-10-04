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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const client_entity_1 = require("./entities/client.entity");
const user_state_enum_1 = require("../../enums/user-state.enum");
const mail_service_1 = require("../../mail/mail.service");
const model_service_1 = require("../model/model.service");
let ClientService = class ClientService {
    constructor(clientRepository, jwtService, mailService, modelService) {
        this.clientRepository = clientRepository;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.modelService = modelService;
    }
    async register(clientData) {
        const verifyClient = await this.clientRepository.findOne({ pseudo: clientData.pseudo });
        if (verifyClient)
            return {
                message: "Le pseudo est déjà utilisé",
                error: true,
                pseudo: true
            };
        const verifyEmail = await this.modelService.isEmailClientExist(clientData.email);
        if (verifyEmail) {
            return {
                message: "L'\tadresse email existe déjà",
                error: true,
                email: true
            };
        }
        const client = await this.clientRepository.create(Object.assign({}, clientData));
        client.salt = await bcrypt.genSalt();
        client.password = await bcrypt.hash(client.password, client.salt);
        try {
            const payload = {
                id: client.id,
                email: client.email,
                role: 'client',
                pseudo: client.pseudo
            };
            const jwt = await this.jwtService.sign(payload);
            await this.mailService.confirmRegisterClient(client.email, client.pseudo, jwt);
            await this.clientRepository.save(client);
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
            id: client.id,
            pseudo: client.pseudo,
            email: client.email,
            password: client.password
        };
    }
    async login(credentials) {
        const { pseudo, password } = credentials;
        const client = await this.clientRepository.createQueryBuilder("client")
            .where("client.email = :pseudo", {
            pseudo
        }).getOne();
        if (!client) {
            return {
                message: "Email ou mot de passe erronée",
                error: true
            };
        }
        if (client.state === user_state_enum_1.UserStateEnum.WAITING) {
            return {
                message: "Veuillez confirmer votre email de validation.",
                error: true
            };
        }
        if (client.state === user_state_enum_1.UserStateEnum.BLOCKED) {
            return {
                message: "Ce compte a été bloqué par l\'administrateur.",
                error: true
            };
        }
        if (client.state === user_state_enum_1.UserStateEnum.DEACTIVATE) {
            return {
                message: "Ce compte est désactivé.",
                error: true
            };
        }
        if (client.state === user_state_enum_1.UserStateEnum.DELETED) {
            return {
                message: "Ce compte est supprimé.",
                error: true
            };
        }
        if (client.state === user_state_enum_1.UserStateEnum.REJECTED) {
            return {
                message: "Ce compte a été refusé.",
                error: true
            };
        }
        const hashPassword = await bcrypt.hash(password, client.salt);
        if (hashPassword === client.password) {
            const payload = {
                id: client.id,
                email: client.email,
                role: client.role,
                pseudo: client.pseudo
            };
            const jwt = await this.jwtService.sign(payload);
            return {
                "access_token": jwt,
                id: client.id,
                pseudo: client.pseudo,
                email: client.email,
                role: client.role
            };
        }
        else {
            return {
                message: "Pseudo ou mot de passe erronée",
                error: true
            };
        }
    }
    async confirmEmail(client) {
        const id = client.id;
        const date = new Date();
        const newClient = await this.clientRepository.preload(Object.assign({ id }, client));
        if (!client) {
            return {
                success: false,
                message: "Client inexistant."
            };
        }
        if (newClient.state !== user_state_enum_1.UserStateEnum.WAITING) {
            return {
                success: false,
                message: "Ce lien est expiré.."
            };
        }
        newClient.state = user_state_enum_1.UserStateEnum.VALIDATE;
        await this.clientRepository.save(newClient);
        return {
            success: true,
            message: "Félicitation ! Profitez de nos meilleurs packs."
        };
    }
    async getInfo(id) {
        const client = await this.clientRepository.findOne({ id });
        if (!client) {
            return null;
        }
        const { password, salt } = client, result = __rest(client, ["password", "salt"]);
        return result;
    }
    async getInfos(client) {
        const newClient = await this.clientRepository.findOne({ id: client.id });
        const { password, salt } = newClient, result = __rest(newClient, ["password", "salt"]);
        return result;
    }
    async getClient(id) {
        return await this.clientRepository.findOne({ id });
    }
    async updateClient(id, client) {
        const newClient = await this.clientRepository.preload(Object.assign({ id }, client));
        return await this.clientRepository.save(newClient);
    }
    async forgot(data) {
        const client = await this.clientRepository.findOne({ email: data.email });
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
        const client = await this.clientRepository.preload({
            id
        });
        if (!client) {
            return null;
        }
        const hashPassword = await bcrypt.hash(data.newPassword, client.salt);
        client.password = hashPassword;
        await this.clientRepository.save(client);
        const payload = {
            id: client.id,
            email: client.email,
            role: client.role,
            pseudo: client.pseudo
        };
        const jwt = await this.jwtService.sign(payload);
        return {
            "access_token": jwt,
            id: client.id,
            pseudo: client.pseudo,
            email: client.email,
            role: client.role
        };
    }
    async changePseudo(client, data) {
        const id = client.id;
        await this.clientRepository.update(id, { pseudo: data.pseudo });
        const payload = {
            id: client.id,
            email: client.email,
            role: client.role,
            pseudo: data.pseudo
        };
        const jwt = await this.jwtService.sign(payload);
        return {
            "access_token": jwt,
            id: client.id,
            pseudo: client.pseudo,
            email: client.email,
            role: client.role
        };
    }
    async changePassword(client, data) {
        const verifyClient = await this.clientRepository.findOne({ pseudo: client.pseudo });
        if (!verifyClient)
            return {
                error: true,
                message: 'Le client n\' existe pas'
            };
        const hashPassword = await bcrypt.hash(data.oldPassword, verifyClient.salt);
        if (hashPassword === verifyClient.password) {
            const newPassword = await bcrypt.hash(data.newPassword, verifyClient.salt);
            const id = client.id;
            await this.clientRepository.update(id, { password: newPassword });
            return {
                success: true,
                message: "Mot de passe modifié"
            };
        }
        else {
            return {
                message: "Mot de passe incorrect",
                error: true
            };
        }
    }
    async deleteAccount(client, data) {
        if (client.role !== 'client')
            return null;
        const id = client.id;
        const newClient = await this.clientRepository.findOne({ id });
        const hashPassword = await bcrypt.hash(data.password, newClient.salt);
        if (hashPassword !== newClient.password) {
            return {
                error: true,
                message: 'Mot de passe incorrect'
            };
        }
        await this.clientRepository.update(id, { state: user_state_enum_1.UserStateEnum.DELETED });
        const payload = {
            id: client.id,
            email: client.email,
            role: client.role,
            pseudo: client.pseudo
        };
        const jwt = await this.jwtService.sign(payload);
        await this.mailService.deleteAccount(client.email, client.pseudo, jwt);
        return {
            success: true,
            message: 'Compte supprimé'
        };
    }
    async restoreAccount(client) {
        if (client.role !== 'client')
            return null;
        const id = client.id;
        await this.clientRepository.update(id, { state: user_state_enum_1.UserStateEnum.VALIDATE });
        await this.clientRepository.restore(id);
        return {
            success: true,
            message: 'Compte restoré'
        };
    }
    async deactivateAccount(client, data) {
        if (client.role !== 'client')
            return null;
        const id = client.id;
        const newClient = await this.clientRepository.findOne({ id });
        const hashPassword = await bcrypt.hash(data.password, newClient.salt);
        if (hashPassword !== newClient.password) {
            return {
                error: true,
                message: 'Mot de passe incorrect'
            };
        }
        await this.clientRepository.update(id, { state: user_state_enum_1.UserStateEnum.DEACTIVATE });
        const payload = {
            id: client.id,
            email: client.email,
            role: client.role,
            pseudo: client.pseudo
        };
        const jwt = await this.jwtService.sign(payload);
        await this.mailService.deactivateAccount(client.email, client.pseudo, jwt);
        return {
            success: true,
            message: 'Compte désactivé'
        };
    }
    async reactivateAccount(client) {
        if (client.role !== 'client')
            return null;
        const id = client.id;
        await this.clientRepository.update(id, { state: user_state_enum_1.UserStateEnum.VALIDATE });
        return {
            success: true,
            message: 'Compte réactivé'
        };
    }
    async countClients(motif) {
        const qb = this.clientRepository.createQueryBuilder('client');
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
        const qb = this.clientRepository.createQueryBuilder('client');
        const motif = 'Bloque';
        return await qb.select()
            .where("state = :motif", { motif: motif })
            .getCount();
    }
    async getAllClientBlocked(range, page, filter) {
        const qb = this.clientRepository.createQueryBuilder('client');
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
        const qb = this.clientRepository.createQueryBuilder('client');
        if (!filter) {
            if (motif === 'tous') {
                const exclus = 'Bloque';
                return await qb.select()
                    .where("state != :motif", { motif: exclus })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
            else {
                return await qb.select()
                    .where("state = :motif", { motif: motif })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
        }
        else {
            if (motif === 'tous') {
                return await qb.select()
                    .where("(pseudo like :filter or email like :filter)", { filter: '%' + filter + '%', motif: motif })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
            else {
                return await qb.select()
                    .where("(pseudo like :filter or email like :filter) and state = :motif", { filter: '%' + filter + '%', motif: motif })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
        }
    }
    async deleteClient(idClient) {
        const user = await this.clientRepository.findOne({ id: idClient });
        if (!user) {
            return {
                error: true,
                message: 'Client inexistant'
            };
        }
        await this.clientRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.DELETED });
        return {
            success: true,
            message: `Compte client d\'id ${idClient} a été supprimé`
        };
    }
    async blockClient(idClient, reverse) {
        const user = await this.clientRepository.findOne({ id: idClient });
        if (!user) {
            return {
                error: true,
                message: 'Client inexistant'
            };
        }
        if (reverse) {
            await this.clientRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.VALIDATE });
        }
        else {
            await this.clientRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.BLOCKED });
        }
        return {
            success: true,
            message: `Compte client d\'id ${idClient} a été bloqué`
        };
    }
    async deactivateClient(idClient) {
        const user = await this.clientRepository.findOne({ id: idClient });
        if (!user) {
            return {
                error: true,
                message: 'Client inexistant'
            };
        }
        await this.clientRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.DEACTIVATE });
        return {
            success: true,
            message: `Compte client d\'id ${idClient} a été désactivé`
        };
    }
    async activateClient(idClient) {
        const user = await this.clientRepository.findOne({ id: idClient });
        if (!user) {
            return {
                error: true,
                message: 'Client inexistant'
            };
        }
        await this.clientRepository.update(idClient, { state: user_state_enum_1.UserStateEnum.VALIDATE });
        return {
            success: true,
            message: `Compte client d\'id ${idClient} a été activé`
        };
    }
    async statInscriptionClient() {
        const qb = this.clientRepository.createQueryBuilder('client');
        return await qb.select("date(client.createdAt) as date, count(client.id) as count")
            .groupBy("date(client.createdAt)")
            .getRawMany();
    }
    async countClientActif() {
        const qb = this.clientRepository.createQueryBuilder('client');
        const actif = 'Valide';
        return await qb.select()
            .where('state = :actif', { actif: actif })
            .getCount();
    }
    async newLastClients() {
        let actual = new Date();
        let currentMonth = actual.getMonth() + 1;
        let currentYear = actual.getFullYear();
        const qb = this.clientRepository.createQueryBuilder('client');
        const actif = 'Valide';
        return await qb.select()
            .where('state = :actif and month(createdAt) = :currentMonth and year(createdAt) = :currentYear', { actif: actif, currentMonth: currentMonth, currentYear: currentYear })
            .getCount();
    }
};
ClientService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(client_entity_1.ClientEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mail_service_1.MailService,
        model_service_1.ModelService])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map