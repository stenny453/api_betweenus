"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetweenShopModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const between_shop_controller_1 = require("./between-shop.controller");
const between_shop_service_1 = require("./between-shop.service");
const between_shop_entity_1 = require("./entities/between-shop.entity");
let BetweenShopModule = class BetweenShopModule {
};
BetweenShopModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([between_shop_entity_1.BetweenShopEntity]),
        ],
        controllers: [between_shop_controller_1.BetweenShopController],
        providers: [between_shop_service_1.BetweenShopService],
        exports: [
            between_shop_service_1.BetweenShopService
        ]
    })
], BetweenShopModule);
exports.BetweenShopModule = BetweenShopModule;
//# sourceMappingURL=between-shop.module.js.map