"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanishModule = void 0;
const common_1 = require("@nestjs/common");
const banish_controller_1 = require("./banish.controller");
const banish_service_1 = require("./banish.service");
const typeorm_1 = require("@nestjs/typeorm");
const banish_entity_1 = require("./entities/banish.entity");
const model_module_1 = require("../users/model/model.module");
const client_module_1 = require("../users/client/client.module");
let BanishModule = class BanishModule {
};
BanishModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([banish_entity_1.BanishEntity]),
            model_module_1.ModelModule,
            client_module_1.ClientModule
        ],
        controllers: [banish_controller_1.BanishController],
        providers: [banish_service_1.BanishService]
    })
], BanishModule);
exports.BanishModule = BanishModule;
//# sourceMappingURL=banish.module.js.map