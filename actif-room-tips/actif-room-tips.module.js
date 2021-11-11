"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActifRoomTipsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const client_module_1 = require("../users/client/client.module");
const actif_room_tips_controller_1 = require("./actif-room-tips.controller");
const actif_room_tips_service_1 = require("./actif-room-tips.service");
const actif_room_tips_entity_1 = require("./entities/actif-room-tips.entity");
const room_tips_module_1 = require("../room-tips/room-tips.module");
let ActifRoomTipsModule = class ActifRoomTipsModule {
};
ActifRoomTipsModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([actif_room_tips_entity_1.ActifRoomTipsEntity]),
            room_tips_module_1.RoomTipsModule,
            client_module_1.ClientModule
        ],
        controllers: [actif_room_tips_controller_1.ActifRoomTipsController],
        providers: [actif_room_tips_service_1.ActifRoomTipsService],
        exports: [
            actif_room_tips_service_1.ActifRoomTipsService
        ]
    })
], ActifRoomTipsModule);
exports.ActifRoomTipsModule = ActifRoomTipsModule;
//# sourceMappingURL=actif-room-tips.module.js.map