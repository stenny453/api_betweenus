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
exports.ActifRoomTipsController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../decorators/user.decorator");
const client_entity_1 = require("../users/client/entities/client.entity");
const model_auth_guard_1 = require("../users/model/guards/model-auth.guard");
const actif_room_tips_service_1 = require("./actif-room-tips.service");
const add_actif_tips_dto_1 = require("./dto/add-actif-tips.dto");
let ActifRoomTipsController = class ActifRoomTipsController {
    constructor(actifRoomTipsService) {
        this.actifRoomTipsService = actifRoomTipsService;
    }
    async updateActif(user, data) {
        return await this.actifRoomTipsService.updateActif(user, data);
    }
    async getAll() {
        return await this.actifRoomTipsService.getAll();
    }
    async getActifsRoom(id) {
        return await this.actifRoomTipsService.getActifsRoom(id);
    }
};
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post(),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_entity_1.ClientEntity,
        add_actif_tips_dto_1.AddActifTipsDto]),
    __metadata("design:returntype", Promise)
], ActifRoomTipsController.prototype, "updateActif", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActifRoomTipsController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActifRoomTipsController.prototype, "getActifsRoom", null);
ActifRoomTipsController = __decorate([
    common_1.Controller('actif-room-tips'),
    __metadata("design:paramtypes", [actif_room_tips_service_1.ActifRoomTipsService])
], ActifRoomTipsController);
exports.ActifRoomTipsController = ActifRoomTipsController;
//# sourceMappingURL=actif-room-tips.controller.js.map