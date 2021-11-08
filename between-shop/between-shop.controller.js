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
exports.BetweenShopController = void 0;
const common_1 = require("@nestjs/common");
const between_shop_service_1 = require("./between-shop.service");
const model_auth_guard_1 = require("../users/model/guards/model-auth.guard");
const user_decorator_1 = require("../decorators/user.decorator");
const client_entity_1 = require("../users/client/entities/client.entity");
const add_item_vip_dto_1 = require("./dto/add-item-vip.dto");
let BetweenShopController = class BetweenShopController {
    constructor(betweenShopService) {
        this.betweenShopService = betweenShopService;
    }
    async addItemVIP(client, data) {
        return await this.betweenShopService.addItemVIP(client.id, data);
    }
    async getListItemsVIP(client) {
        return await this.betweenShopService.getListItemsVIP(client.id);
    }
    async getListItemsVIPWithSymbol(client, symbol) {
        return await this.betweenShopService.getListItemsVIP(client.id, symbol);
    }
};
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post(),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_entity_1.ClientEntity,
        add_item_vip_dto_1.AddItemVipDto]),
    __metadata("design:returntype", Promise)
], BetweenShopController.prototype, "addItemVIP", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get(),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_entity_1.ClientEntity]),
    __metadata("design:returntype", Promise)
], BetweenShopController.prototype, "getListItemsVIP", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Get(':symbol'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Param('symbol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_entity_1.ClientEntity, Object]),
    __metadata("design:returntype", Promise)
], BetweenShopController.prototype, "getListItemsVIPWithSymbol", null);
BetweenShopController = __decorate([
    common_1.Controller('between-shop'),
    __metadata("design:paramtypes", [between_shop_service_1.BetweenShopService])
], BetweenShopController);
exports.BetweenShopController = BetweenShopController;
//# sourceMappingURL=between-shop.controller.js.map