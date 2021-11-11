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
exports.RoomTipsController = void 0;
const model_entity_1 = require("../users/model/entities/model.entity");
const common_1 = require("@nestjs/common");
const room_tips_service_1 = require("./room-tips.service");
const client_entity_1 = require("../users/client/entities/client.entity");
const user_decorator_1 = require("../decorators/user.decorator");
const model_auth_guard_1 = require("../users/model/guards/model-auth.guard");
const create_room_tips_dto_1 = require("./dto/create-room-tips.dto");
let RoomTipsController = class RoomTipsController {
    constructor(roomTipsService) {
        this.roomTipsService = roomTipsService;
    }
    payCostToEnter(client, data) {
        return this.roomTipsService.payCostToEnter(data.creditId, data.credit);
    }
    createRoom(model, data) {
        return this.roomTipsService.createRoom(model, data);
    }
    getRoomModel(id) {
        return this.roomTipsService.getLastRoom(id);
    }
    getStatRoom(id) {
        return this.roomTipsService.getStatRoom(id);
    }
    updateActif(client, data) {
        return this.roomTipsService.updateActif(client, data);
    }
    updateGain(client, data) {
        return this.roomTipsService.updateGain(data.roomId, data.gain);
    }
};
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('payCostToEnter'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_entity_1.ClientEntity, Object]),
    __metadata("design:returntype", void 0)
], RoomTipsController.prototype, "payCostToEnter", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('createRoom'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_entity_1.ModelEntity,
        create_room_tips_dto_1.CreateRoomTipsDto]),
    __metadata("design:returntype", void 0)
], RoomTipsController.prototype, "createRoom", null);
__decorate([
    common_1.Get('model/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomTipsController.prototype, "getRoomModel", null);
__decorate([
    common_1.Get('stat/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomTipsController.prototype, "getStatRoom", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('updateActif'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_entity_1.ClientEntity, Object]),
    __metadata("design:returntype", void 0)
], RoomTipsController.prototype, "updateActif", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('updateGain'),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RoomTipsController.prototype, "updateGain", null);
RoomTipsController = __decorate([
    common_1.Controller('room-tips'),
    __metadata("design:paramtypes", [room_tips_service_1.RoomTipsService])
], RoomTipsController);
exports.RoomTipsController = RoomTipsController;
//# sourceMappingURL=room-tips.controller.js.map