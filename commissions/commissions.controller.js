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
exports.CommissionsController = void 0;
const model_entity_1 = require("../users/model/entities/model.entity");
const common_1 = require("@nestjs/common");
const commissions_service_1 = require("./commissions.service");
const user_decorator_1 = require("../decorators/user.decorator");
const model_auth_guard_1 = require("../users/model/guards/model-auth.guard");
let CommissionsController = class CommissionsController {
    constructor(commissionService) {
        this.commissionService = commissionService;
    }
    async getAllCommissions(model) {
        return await this.commissionService.getAllCommissions();
    }
    async getModelCommission(model) {
        return await this.commissionService.getModelCommission(model.id);
    }
    async verifyCommission(model, data) {
        return await this.commissionService.isCommission(model.id, data.credit);
    }
};
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get(),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_entity_1.ModelEntity]),
    __metadata("design:returntype", Promise)
], CommissionsController.prototype, "getAllCommissions", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('model'),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_entity_1.ModelEntity]),
    __metadata("design:returntype", Promise)
], CommissionsController.prototype, "getModelCommission", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('verify'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_entity_1.ModelEntity, Object]),
    __metadata("design:returntype", Promise)
], CommissionsController.prototype, "verifyCommission", null);
CommissionsController = __decorate([
    common_1.Controller('commissions'),
    __metadata("design:paramtypes", [commissions_service_1.CommissionsService])
], CommissionsController);
exports.CommissionsController = CommissionsController;
//# sourceMappingURL=commissions.controller.js.map