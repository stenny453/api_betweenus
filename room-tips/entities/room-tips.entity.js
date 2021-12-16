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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomTipsEntity = void 0;
const model_entity_1 = require("../../users/model/entities/model.entity");
const typeorm_1 = require("typeorm");
const timestamp_entities_1 = require("../../generics/timestamp.entities");
const actif_room_tips_entity_1 = require("../../actif-room-tips/entities/actif-room-tips.entity");
let RoomTipsEntity = class RoomTipsEntity extends timestamp_entities_1.TimestampEntities {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RoomTipsEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        default: 0
    }),
    __metadata("design:type", Number)
], RoomTipsEntity.prototype, "actif", void 0);
__decorate([
    typeorm_1.Column({
        default: 0
    }),
    __metadata("design:type", Number)
], RoomTipsEntity.prototype, "gain", void 0);
__decorate([
    typeorm_1.Column({
        default: 'open'
    }),
    __metadata("design:type", String)
], RoomTipsEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToOne(type => model_entity_1.ModelEntity, (model) => model.tipsRooms, {
        eager: true
    }),
    __metadata("design:type", model_entity_1.ModelEntity)
], RoomTipsEntity.prototype, "model", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], RoomTipsEntity.prototype, "tips", void 0);
__decorate([
    typeorm_1.Column({
        default: null,
        length: 5000
    }),
    __metadata("design:type", String)
], RoomTipsEntity.prototype, "descriptions", void 0);
__decorate([
    typeorm_1.OneToMany(type => actif_room_tips_entity_1.ActifRoomTipsEntity, (actifRoomTips) => actifRoomTips.roomTips, {
        nullable: true,
        cascade: true,
        eager: true
    }),
    __metadata("design:type", actif_room_tips_entity_1.ActifRoomTipsEntity)
], RoomTipsEntity.prototype, "clients", void 0);
RoomTipsEntity = __decorate([
    typeorm_1.Entity('room-tips')
], RoomTipsEntity);
exports.RoomTipsEntity = RoomTipsEntity;
//# sourceMappingURL=room-tips.entity.js.map