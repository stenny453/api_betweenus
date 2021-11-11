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
exports.ActifRoomTipsEntity = void 0;
const album_model_enum_1 = require("../../enums/album-model.enum");
const room_tips_entity_1 = require("../../room-tips/entities/room-tips.entity");
const client_entity_1 = require("../../users/client/entities/client.entity");
const typeorm_1 = require("typeorm");
const timestamp_entities_1 = require("../../generics/timestamp.entities");
let ActifRoomTipsEntity = class ActifRoomTipsEntity extends timestamp_entities_1.TimestampEntities {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ActifRoomTipsEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => client_entity_1.ClientEntity, (client) => client.rooms, {
        eager: true
    }),
    __metadata("design:type", Object)
], ActifRoomTipsEntity.prototype, "client", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: album_model_enum_1.AlbumModelEnum,
        default: album_model_enum_1.AlbumModelEnum.FREE
    }),
    __metadata("design:type", String)
], ActifRoomTipsEntity.prototype, "type_room", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], ActifRoomTipsEntity.prototype, "peerId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => room_tips_entity_1.RoomTipsEntity, (roomTips) => roomTips.clients),
    __metadata("design:type", room_tips_entity_1.RoomTipsEntity)
], ActifRoomTipsEntity.prototype, "roomTips", void 0);
ActifRoomTipsEntity = __decorate([
    typeorm_1.Entity('actif-room-tips')
], ActifRoomTipsEntity);
exports.ActifRoomTipsEntity = ActifRoomTipsEntity;
//# sourceMappingURL=actif-room-tips.entity.js.map