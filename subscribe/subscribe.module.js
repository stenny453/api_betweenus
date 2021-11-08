"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeModule = void 0;
const common_1 = require("@nestjs/common");
const subscribe_controller_1 = require("./subscribe.controller");
const subscribe_service_1 = require("./subscribe.service");
const subscribe_entity_1 = require("./entities/subscribe.entity");
const typeorm_1 = require("@nestjs/typeorm");
const client_module_1 = require("../users/client/client.module");
let SubscribeModule = class SubscribeModule {
};
SubscribeModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([subscribe_entity_1.SubscribeEntity]),
            client_module_1.ClientModule
        ],
        controllers: [subscribe_controller_1.SubscribeController],
        providers: [subscribe_service_1.SubscribeService],
        exports: [
            subscribe_service_1.SubscribeService
        ]
    })
], SubscribeModule);
exports.SubscribeModule = SubscribeModule;
//# sourceMappingURL=subscribe.module.js.map