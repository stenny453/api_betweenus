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
exports.BuyPackController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../decorators/user.decorator");
const model_auth_guard_1 = require("../users/model/guards/model-auth.guard");
const buy_pack_service_1 = require("./buy-pack.service");
const add_buy_pack_dto_1 = require("./dto/add-buy-pack.dto");
const client_entity_1 = require("../users/client/entities/client.entity");
let BuyPackController = class BuyPackController {
    constructor(buyPackService) {
        this.buyPackService = buyPackService;
    }
    async buyPack(data, client) {
        return await this.buyPackService.addBuyPack(client, data);
    }
    async verifyPack(client) {
        return await this.buyPackService.verifyPack(client);
    }
};
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_buy_pack_dto_1.AddBuyPackDto,
        client_entity_1.ClientEntity]),
    __metadata("design:returntype", Promise)
], BuyPackController.prototype, "buyPack", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('verifyPack'),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_entity_1.ClientEntity]),
    __metadata("design:returntype", Promise)
], BuyPackController.prototype, "verifyPack", null);
BuyPackController = __decorate([
    common_1.Controller('buy-pack'),
    __metadata("design:paramtypes", [buy_pack_service_1.BuyPackService])
], BuyPackController);
exports.BuyPackController = BuyPackController;
//# sourceMappingURL=buy-pack.controller.js.map