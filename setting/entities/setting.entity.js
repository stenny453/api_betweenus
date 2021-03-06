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
exports.SettingEntity = void 0;
const model_entity_1 = require("../../users/model/entities/model.entity");
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../../users/client/entities/client.entity");
let SettingEntity = class SettingEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SettingEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], SettingEntity.prototype, "sound_notification", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], SettingEntity.prototype, "mail_notification", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], SettingEntity.prototype, "sound_message", void 0);
__decorate([
    typeorm_1.OneToOne(() => model_entity_1.ModelEntity, model => model.setting),
    __metadata("design:type", model_entity_1.ModelEntity)
], SettingEntity.prototype, "model", void 0);
__decorate([
    typeorm_1.OneToOne(() => client_entity_1.ClientEntity, client => client.setting),
    __metadata("design:type", client_entity_1.ClientEntity)
], SettingEntity.prototype, "client", void 0);
SettingEntity = __decorate([
    typeorm_1.Entity('setting')
], SettingEntity);
exports.SettingEntity = SettingEntity;
//# sourceMappingURL=setting.entity.js.map