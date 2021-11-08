"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomTipsModule = void 0;
const common_1 = require("@nestjs/common");
const room_tips_controller_1 = require("./room-tips.controller");
const room_tips_service_1 = require("./room-tips.service");
const room_tips_entity_1 = require("./entities/room-tips.entity");
const typeorm_1 = require("@nestjs/typeorm");
const client_module_1 = require("../users/client/client.module");
const model_module_1 = require("../users/model/model.module");
const credit_module_1 = require("../credit/credit.module");
const profile_module_1 = require("../profil/profile.module");
let RoomTipsModule = class RoomTipsModule {
};
RoomTipsModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([room_tips_entity_1.RoomTipsEntity]),
            model_module_1.ModelModule,
            client_module_1.ClientModule,
            credit_module_1.CreditModule,
            profile_module_1.ProfileModule
        ],
        controllers: [room_tips_controller_1.RoomTipsController],
        providers: [room_tips_service_1.RoomTipsService],
        exports: [
            room_tips_service_1.RoomTipsService
        ]
    })
], RoomTipsModule);
exports.RoomTipsModule = RoomTipsModule;
//# sourceMappingURL=room-tips.module.js.map