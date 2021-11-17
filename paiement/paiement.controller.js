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
exports.PaiementController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../decorators/user.decorator");
const model_auth_guard_1 = require("../users/model/guards/model-auth.guard");
const paiement_service_1 = require("./paiement.service");
const client_entity_1 = require("../users/client/entities/client.entity");
let PaiementController = class PaiementController {
    constructor(paiementService) {
        this.paiementService = paiementService;
    }
    async buyPack(client, data) {
        if (!client.id)
            return null;
        this.paiementService.buyPack(client.id, client.pseudo, client.email, data.credit);
    }
    async getSuiviPay(client, id) {
        console.log('Id model ', id);
        return await this.paiementService.getSuiviPay(id);
    }
};
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('buy-pack'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_entity_1.ClientEntity, Object]),
    __metadata("design:returntype", Promise)
], PaiementController.prototype, "buyPack", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('getSuiviPay/:id'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_entity_1.ClientEntity, Object]),
    __metadata("design:returntype", Promise)
], PaiementController.prototype, "getSuiviPay", null);
PaiementController = __decorate([
    common_1.Controller('paiement'),
    __metadata("design:paramtypes", [paiement_service_1.PaiementService])
], PaiementController);
exports.PaiementController = PaiementController;
//# sourceMappingURL=paiement.controller.js.map