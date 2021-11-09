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
exports.SubscribeController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../decorators/user.decorator");
const model_auth_guard_1 = require("../users/model/guards/model-auth.guard");
const subscribe_service_1 = require("./subscribe.service");
const add_subscribe_dto_1 = require("./dto/add-subscribe.dto");
const client_entity_1 = require("../users/client/entities/client.entity");
let SubscribeController = class SubscribeController {
    constructor(subscribeService) {
        this.subscribeService = subscribeService;
    }
    async newSubscribe(client, data) {
        return await this.subscribeService.newSubscribe(client.id, data);
    }
    async isSubscribed(client) {
        return await this.subscribeService.isSubscribed(client.id);
    }
};
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('new'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_entity_1.ClientEntity,
        add_subscribe_dto_1.AddSubscribeDto]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "newSubscribe", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get('verify'),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_entity_1.ClientEntity]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "isSubscribed", null);
SubscribeController = __decorate([
    common_1.Controller('subscribe'),
    __metadata("design:paramtypes", [subscribe_service_1.SubscribeService])
], SubscribeController);
exports.SubscribeController = SubscribeController;
//# sourceMappingURL=subscribe.controller.js.map