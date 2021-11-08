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
exports.BetweenShopService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const between_shop_entity_1 = require("./entities/between-shop.entity");
let BetweenShopService = class BetweenShopService {
    constructor(betweenShopRepository) {
        this.betweenShopRepository = betweenShopRepository;
    }
    async addItemVIP(clientId, data) {
        const newItem = await this.betweenShopRepository.create();
        newItem.clientId = clientId;
        newItem.price = data.price;
        newItem.symbol = data.symbol;
        return await this.betweenShopRepository.save(newItem);
    }
    async getListItemsVIP(clientId, symbol) {
        if (symbol === undefined) {
            return await this.betweenShopRepository.find({ clientId });
        }
        return await this.betweenShopRepository.find({ clientId, symbol });
    }
};
BetweenShopService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(between_shop_entity_1.BetweenShopEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BetweenShopService);
exports.BetweenShopService = BetweenShopService;
//# sourceMappingURL=between-shop.service.js.map