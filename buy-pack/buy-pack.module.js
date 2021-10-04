"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyPackModule = void 0;
const common_1 = require("@nestjs/common");
const buy_pack_service_1 = require("./buy-pack.service");
const buy_pack_controller_1 = require("./buy-pack.controller");
const buy_pack_entity_1 = require("./entities/buy-pack.entity");
const typeorm_1 = require("@nestjs/typeorm");
const client_module_1 = require("../users/client/client.module");
let BuyPackModule = class BuyPackModule {
};
BuyPackModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([buy_pack_entity_1.BuyPackEntity]),
            client_module_1.ClientModule
        ],
        controllers: [buy_pack_controller_1.BuyPackController],
        providers: [buy_pack_service_1.BuyPackService],
        exports: [
            buy_pack_service_1.BuyPackService
        ]
    })
], BuyPackModule);
exports.BuyPackModule = BuyPackModule;
//# sourceMappingURL=buy-pack.module.js.map