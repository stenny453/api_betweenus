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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const room_vip_service_1 = require("./../room-vip/room-vip.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const bcrypt = require("bcrypt");
const client_service_1 = require("../users/client/client.service");
const model_service_1 = require("../users/model/model.service");
const room_private_service_1 = require("../room-private/room-private.service");
const paiement_service_1 = require("../paiement/paiement.service");
const timer_service_1 = require("../timer/timer.service");
const credit_service_1 = require("../credit/credit.service");
const mail_service_1 = require("../mail/mail.service");
const taboo_service_1 = require("../taboo/taboo.service");
let AdminService = class AdminService {
    constructor(adminRepository, jwtService, clientService, modelService, roomPrivateService, roomVipService, paiementService, timerService, creditService, mailService, tabooService) {
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
        this.clientService = clientService;
        this.modelService = modelService;
        this.roomPrivateService = roomPrivateService;
        this.roomVipService = roomVipService;
        this.paiementService = paiementService;
        this.timerService = timerService;
        this.creditService = creditService;
        this.mailService = mailService;
        this.tabooService = tabooService;
    }
    async login(credentials) {
        const { email, password } = credentials;
        const admin = await this.adminRepository.createQueryBuilder("admin")
            .where("admin.email = :email", {
            email
        }).getOne();
        if (!admin) {
            return {
                error: true,
                message: 'Vous n\' avez pas l\'accès 💥'
            };
        }
        const hashPassword = await bcrypt.hash(password, admin.salt);
        if (hashPassword === admin.password) {
            const payload = {
                email: admin.email,
                role: admin.role
            };
            const jwt = await this.jwtService.sign(payload);
            return {
                "access_token": jwt
            };
        }
        else {
            return {
                error: true,
                message: 'Vous n\' avez pas l\'accès 💥'
            };
        }
    }
    async getClients(motif, range, page, filter) {
        const result = await this.clientService.getAllClients(motif, range, page, filter);
        return result;
    }
    async countClients(motif) {
        const result = await this.clientService.countClients(motif);
        return {
            count: result
        };
    }
    async deleteClient(idClient) {
        return await this.clientService.deleteClient(idClient);
    }
    async blockClient(idClient, reverse) {
        return await this.clientService.blockClient(idClient, reverse);
    }
    async deactivateClient(idClient) {
        return await this.clientService.deactivateClient(idClient);
    }
    async activateClient(idClient) {
        return await this.clientService.activateClient(idClient);
    }
    async countClientBlocked() {
        return await this.clientService.countClientBlocked();
    }
    async getAllClientBlocked(range, page, filter) {
        const result = await this.clientService.getAllClientBlocked(range, page, filter);
        return result;
    }
    async statInscriptionClient() {
        return await this.clientService.statInscriptionClient();
    }
    async getModels(motif, range, page, filter) {
        const result = await this.modelService.getAllClients(motif, range, page, filter);
        return result;
    }
    async countModels(motif) {
        const result = await this.modelService.countClients(motif);
        return {
            count: result
        };
    }
    async deleteModel(idClient) {
        return await this.modelService.deleteClient(idClient);
    }
    async blockModel(idClient, reverse) {
        return await this.modelService.blockClient(idClient, reverse);
    }
    async deactivateModel(idClient) {
        return await this.modelService.deactivateClient(idClient);
    }
    async activateModel(idClient) {
        return await this.modelService.activateClient(idClient);
    }
    async countModelBlocked() {
        return await this.modelService.countClientBlocked();
    }
    async getAllModelBlocked(range, page, filter) {
        const result = await this.modelService.getAllClientBlocked(range, page, filter);
        return result;
    }
    async statInscriptionModel() {
        return await this.modelService.statInscriptionClient();
    }
    async statSuppressionModel() {
        return await this.modelService.statSuppressionModel();
    }
    async getModelProfil(status, filter) {
        return await this.modelService.getModelProfil(status, filter);
    }
    async countRequestsModel() {
        return await this.modelService.countRequestsModel();
    }
    async getAllRequestsModel(motif, range, page, filter) {
        return await this.modelService.getAllRequestsModel(motif, range, page, filter);
    }
    async resultRequestModel(idClient, accepted) {
        return await this.modelService.resultRequestModel(idClient, accepted);
    }
    async resultInscriptionModel(idClient, accepted, motif) {
        return await this.modelService.resultInscriptionModel(idClient, accepted, motif);
    }
    async getInfosModel(idClient) {
        return await this.modelService.getInfosModel(idClient);
    }
    async countModelActif() {
        return await this.modelService.countModelActif();
    }
    async countClientActif() {
        return await this.clientService.countClientActif();
    }
    async countModelState(state) {
        return await this.modelService.countModelState(state);
    }
    async newLastClients() {
        return await this.clientService.newLastClients();
    }
    async newLastModels() {
        return await this.clientService.newLastClients();
    }
    async countRoom(motif) {
        if (motif === 'private') {
            return await this.roomPrivateService.countRoom();
        }
        else if (motif === 'vip') {
            return await this.roomVipService.countRoom();
        }
    }
    async getChiffreAffaire() {
        return await this.paiementService.getChiffreAffaire();
    }
    async getAverageClient() {
        return await this.timerService.getAverage();
    }
    async get10LastShowPrivate() {
        return await this.roomPrivateService.get10LastShow();
    }
    async get10LastShowVIP() {
        return await this.roomVipService.get10LastShow();
    }
    async getTop10Model() {
        return await this.modelService.getTop10Model();
    }
    async getCreditActifsModels() {
        return await this.modelService.getCreditActifsModels();
    }
    async countPay() {
        return await this.paiementService.countPay();
    }
    async getListPaiement(flux, range, page, filter) {
        return await this.paiementService.getListPaiement(flux, range, page, filter);
    }
    async payCreditModel(idModel, pseudoModel, emailModel, credit, lastPayement) {
        const model = await this.modelService.getInfosModel(idModel);
        const creditModelId = model.credit.id;
        await this.creditService.saveLastPayment(creditModelId, lastPayement, model);
        return await this.payModel(idModel, pseudoModel, emailModel, credit);
    }
    async payModel(idModel, pseudoModel, emailModel, credit) {
        const model = await this.modelService.getInfosModel(idModel);
        const creditModelId = model.credit.id;
        let actualCreditModel = model.credit.credit;
        let nowCreditModel = actualCreditModel - credit;
        await this.creditService.updateCredit(creditModelId, { credit: nowCreditModel }, model);
        return await this.paiementService.payModel(idModel, pseudoModel, emailModel, credit);
    }
    async deletePaiement(idPay) {
        return await this.paiementService.deletePaiement(idPay);
    }
    async getModelsActif() {
        return await this.modelService.getModelsActif();
    }
    async sendMail(email, objet, message) {
        return await this.mailService.sendMail(email, objet, message);
    }
    async getTaboo() {
        return await this.tabooService.getTaboo();
    }
    async deleteTaboo(idTaboo) {
        return await this.tabooService.deleteTaboo(idTaboo);
    }
    async addTaboo(word) {
        return await this.tabooService.addTaboo({ word });
    }
    async getInfo(idUser) {
        return await this.adminRepository.findOne({ id: idUser });
    }
    async updateInfo(idUser, pseudo, url) {
        const id = idUser;
        const data = {
            pseudo,
            url
        };
        const admin = await this.adminRepository.preload(Object.assign({ id }, data));
        if (!admin) {
            return {
                error: true,
                message: 'Admin inexistant'
            };
        }
        await this.adminRepository.save(admin);
        return {
            success: true
        };
    }
    async changePassword(idUser, oldPassword, newPassword) {
        const newAdmin = await this.adminRepository.findOne({ id: idUser });
        if (!newAdmin) {
            return {
                error: true,
                message: 'Inexistant'
            };
        }
        const hashPassword = await bcrypt.hash(oldPassword, newAdmin.salt);
        if (hashPassword === newAdmin.password) {
            newAdmin.salt = await bcrypt.genSalt();
            newAdmin.password = await bcrypt.hash(newPassword, newAdmin.salt);
            await this.adminRepository.save(newAdmin);
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
};
AdminService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(admin_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        client_service_1.ClientService,
        model_service_1.ModelService,
        room_private_service_1.RoomPrivateService,
        room_vip_service_1.RoomVipService,
        paiement_service_1.PaiementService,
        timer_service_1.TimerService,
        credit_service_1.CreditService,
        mail_service_1.MailService,
        taboo_service_1.TabooService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map