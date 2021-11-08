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
exports.SubscribeEntity = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../../users/client/entities/client.entity");
const timestamp_entities_1 = require("../../generics/timestamp.entities");
let SubscribeEntity = class SubscribeEntity extends timestamp_entities_1.TimestampEntities {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SubscribeEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(() => client_entity_1.ClientEntity, client => client.subscribe, {
        eager: true
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", client_entity_1.ClientEntity)
], SubscribeEntity.prototype, "client", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", Date)
], SubscribeEntity.prototype, "lastDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], SubscribeEntity.prototype, "price", void 0);
SubscribeEntity = __decorate([
    typeorm_1.Entity('subscribe')
], SubscribeEntity);
exports.SubscribeEntity = SubscribeEntity;
//# sourceMappingURL=subscribe.entity.js.map