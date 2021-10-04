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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const LoginAdminDto_1 = require("./dto/LoginAdminDto");
const model_auth_guard_1 = require("../users/model/guards/model-auth.guard");
const user_decorator_1 = require("../decorators/user.decorator");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async login(credentials) {
        return await this.adminService.login(credentials);
    }
    async statInscriptionClient() {
        return await this.adminService.statInscriptionClient();
    }
    async countClient(motif) {
        return await this.adminService.countClients(motif);
    }
    async countBlocked() {
        return await this.adminService.countClientBlocked();
    }
    async listAllClients(motif, range, page) {
        return await this.adminService.getClients(motif, range, page);
    }
    async listClients(motif, range, page, filter) {
        return await this.adminService.getClients(motif, range, page, filter);
    }
    async listAllClientsBlocked(range, page) {
        return await this.adminService.getAllClientBlocked(range, page);
    }
    async listClientsBlocked(range, page, filter) {
        return await this.adminService.getAllClientBlocked(range, page, filter);
    }
    async deleteClient(idClient) {
        return await this.adminService.deleteClient(idClient);
    }
    async blockClient(data) {
        return await this.adminService.blockClient(data.idClient, data.reverse);
    }
    async deactivateClient(data) {
        return await this.adminService.deactivateClient(data.idClient);
    }
    async activateClient(data) {
        return await this.adminService.activateClient(data.idClient);
    }
    async statInscriptionModel() {
        return await this.adminService.statInscriptionModel();
    }
    async statSuppressionModel() {
        return await this.adminService.statSuppressionModel();
    }
    async countModel(motif) {
        return await this.adminService.countModels(motif);
    }
    async countModelBlocked() {
        return await this.adminService.countModelBlocked();
    }
    async listAllModels(motif, range, page) {
        return await this.adminService.getModels(motif, range, page);
    }
    async listModels(motif, range, page, filter) {
        return await this.adminService.getModels(motif, range, page, filter);
    }
    async listAllModelsBlocked(range, page) {
        return await this.adminService.getAllModelBlocked(range, page);
    }
    async listModelsBlocked(range, page, filter) {
        return await this.adminService.getAllModelBlocked(range, page, filter);
    }
    async deleteModel(idClient) {
        return await this.adminService.deleteModel(idClient);
    }
    async blockModel(data) {
        return await this.adminService.blockModel(data.idClient, data.reverse);
    }
    async deactivateModel(data) {
        return await this.adminService.deactivateModel(data.idClient);
    }
    async activateModel(data) {
        return await this.adminService.activateModel(data.idClient);
    }
    async getModelProfil(status) {
        return await this.adminService.getModelProfil(status);
    }
    async getModelProfilFilter(status, filter) {
        return await this.adminService.getModelProfil(status, filter);
    }
    async countRequestsModel() {
        return await this.adminService.countRequestsModel();
    }
    async getRequestsModel(motif, range, page) {
        return await this.adminService.getAllRequestsModel(motif, range, page);
    }
    async getAllRequestsModel(motif, range, page, filter) {
        return await this.adminService.getAllRequestsModel(motif, range, page, filter);
    }
    async ResultRequestModel(data) {
        return await this.adminService.resultRequestModel(data.idClient, data.accepted);
    }
    async ResultInscriptionModel(data) {
        return await this.adminService.resultInscriptionModel(data.idClient, data.accepted, data.motif);
    }
    async getInfosModel(idClient) {
        return await this.adminService.getInfosModel(idClient);
    }
    async countModelActif() {
        return await this.adminService.countModelActif();
    }
    async countClientActif() {
        return await this.adminService.countClientActif();
    }
    async countModelState(state) {
        return await this.adminService.countModelState(state);
    }
    async newLastClients() {
        return await this.adminService.newLastClients();
    }
    async newLastModels() {
        return await this.adminService.newLastClients();
    }
    async countRoom(type) {
        return await this.adminService.countRoom(type);
    }
    async getChiffreAffaire() {
        return await this.adminService.getChiffreAffaire();
    }
    async payModel(data) {
        return await this.adminService.payModel(data.idModel, data.pseudoModel, data.emailModel, data.credit);
    }
    async getAverageClient() {
        return await this.adminService.getAverageClient();
    }
    async get10LastShowPrivate() {
        return await this.adminService.get10LastShowPrivate();
    }
    async get10LastShowVIP() {
        return await this.adminService.get10LastShowVIP();
    }
    async getTop10Model() {
        return await this.adminService.getTop10Model();
    }
    async countPay() {
        return await this.adminService.countPay();
    }
    async getListPaiement(flux, range, page) {
        return await this.adminService.getListPaiement(flux, range, page);
    }
    async getListPaiementWithFilter(flux, filter, range, page) {
        return await this.adminService.getListPaiement(flux, range, page, filter);
    }
    async deletePaiement(data) {
        return await this.adminService.deletePaiement(data.idPay);
    }
    async getModelsActif() {
        return await this.adminService.getModelsActif();
    }
    async sendMail(data) {
        return await this.adminService.sendMail(data.email, data.objet, data.message);
    }
    async getTaboo() {
        return await this.adminService.getTaboo();
    }
    async addTaboo(data) {
        return await this.adminService.addTaboo(data.word);
    }
    async deleteTaboo(id) {
        return await this.adminService.deleteTaboo(id);
    }
    async GetInfoAdmin(user) {
        return await this.adminService.getInfo(user.id);
    }
    async UpdateInfoAdmin(user, data) {
        return await this.adminService.updateInfo(user.id, data.pseudo, data.url);
    }
    async ChangePasswordAdmin(user, data) {
        return await this.adminService.changePassword(user.id, data.oldPassword, data.newPassword);
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginAdminDto_1.LoginAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('stat-inscription-client'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "statInscriptionClient", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('count-clients/:motif'),
    __param(0, common_1.Param('motif')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "countClient", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('count-client-blocked'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "countBlocked", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('list-clients/:motif/:range/:page/'),
    __param(0, common_1.Param('motif')),
    __param(1, common_1.Param('range', common_1.ParseIntPipe)),
    __param(2, common_1.Param('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listAllClients", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('list-clients/:motif/:range/:page/:filter'),
    __param(0, common_1.Param('motif')),
    __param(1, common_1.Param('range', common_1.ParseIntPipe)),
    __param(2, common_1.Param('page', common_1.ParseIntPipe)),
    __param(3, common_1.Param('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listClients", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('list-client-blocked/:range/:page/'),
    __param(0, common_1.Param('range', common_1.ParseIntPipe)),
    __param(1, common_1.Param('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listAllClientsBlocked", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('list-client-blocked/:range/:page/:filter'),
    __param(0, common_1.Param('range', common_1.ParseIntPipe)),
    __param(1, common_1.Param('page', common_1.ParseIntPipe)),
    __param(2, common_1.Param('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listClientsBlocked", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Delete('client/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteClient", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('block-client'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "blockClient", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('deactivate-client'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deactivateClient", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('activate-client'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "activateClient", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('stat-inscription-model'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "statInscriptionModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('stat-suppression-model'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "statSuppressionModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('count-models/:motif'),
    __param(0, common_1.Param('motif')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "countModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('count-model-blocked'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "countModelBlocked", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('list-models/:motif/:range/:page/'),
    __param(0, common_1.Param('motif')),
    __param(1, common_1.Param('range', common_1.ParseIntPipe)),
    __param(2, common_1.Param('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listAllModels", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('list-models/:motif/:range/:page/:filter'),
    __param(0, common_1.Param('motif')),
    __param(1, common_1.Param('range', common_1.ParseIntPipe)),
    __param(2, common_1.Param('page', common_1.ParseIntPipe)),
    __param(3, common_1.Param('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listModels", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('list-model-blocked/:range/:page/'),
    __param(0, common_1.Param('range', common_1.ParseIntPipe)),
    __param(1, common_1.Param('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listAllModelsBlocked", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('list-model-blocked/:range/:page/:filter'),
    __param(0, common_1.Param('range', common_1.ParseIntPipe)),
    __param(1, common_1.Param('page', common_1.ParseIntPipe)),
    __param(2, common_1.Param('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listModelsBlocked", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Delete('model/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('block-model'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "blockModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('deactivate-model'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deactivateModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('activate-model'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "activateModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('model-status/:status'),
    __param(0, common_1.Param('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getModelProfil", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('model-status/:status/:filter'),
    __param(0, common_1.Param('status')),
    __param(1, common_1.Param('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getModelProfilFilter", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('count-requests-models'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "countRequestsModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('model-requests/:status/:range/:page'),
    __param(0, common_1.Param('status')),
    __param(1, common_1.Param('range', common_1.ParseIntPipe)),
    __param(2, common_1.Param('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRequestsModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('model-requests/:status/:range/:page/:filter'),
    __param(0, common_1.Param('status')),
    __param(1, common_1.Param('range', common_1.ParseIntPipe)),
    __param(2, common_1.Param('page', common_1.ParseIntPipe)),
    __param(3, common_1.Param('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllRequestsModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('result-request-model'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "ResultRequestModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('result-inscription-model'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "ResultInscriptionModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('getInfosModel/:idClient'),
    __param(0, common_1.Param('idClient', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getInfosModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('countModelActif'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "countModelActif", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('countClientActif'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "countClientActif", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('countModelState/:state'),
    __param(0, common_1.Param('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "countModelState", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('newLastClients'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "newLastClients", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('newLastModels'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "newLastModels", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('countRoom/:type'),
    __param(0, common_1.Param('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "countRoom", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('getChiffreAffaire'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getChiffreAffaire", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('pay-model'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "payModel", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('getAverageClient'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAverageClient", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('get10LastShowPrivate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "get10LastShowPrivate", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('get10LastShowVIP'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "get10LastShowVIP", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('getTop10Model'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTop10Model", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('countPay'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "countPay", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('getListPaiement/:flux/:range/:page/'),
    __param(0, common_1.Param('flux')),
    __param(1, common_1.Param('range', common_1.ParseIntPipe)),
    __param(2, common_1.Param('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getListPaiement", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('getListPaiement/:flux/:range/:page/:filter'),
    __param(0, common_1.Param('flux')),
    __param(1, common_1.Param('filter')),
    __param(2, common_1.Param('range', common_1.ParseIntPipe)),
    __param(3, common_1.Param('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getListPaiementWithFilter", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('deletePaiement'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deletePaiement", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('getModelsActif'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getModelsActif", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('sendMail'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "sendMail", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('list-taboo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTaboo", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('add-taboo'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addTaboo", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Delete('delete-taboo/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteTaboo", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('get-info-admin'),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "GetInfoAdmin", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('update-info-admin'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "UpdateInfoAdmin", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('change-password-admin'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "ChangePasswordAdmin", null);
AdminController = __decorate([
    common_1.Controller('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map