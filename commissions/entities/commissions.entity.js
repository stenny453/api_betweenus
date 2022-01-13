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
exports.CommissionsEntity = void 0;
const model_entity_1 = require("../../users/model/entities/model.entity");
const typeorm_1 = require("typeorm");
const timestamp_entities_1 = require("../../generics/timestamp.entities");
let CommissionsEntity = class CommissionsEntity extends timestamp_entities_1.TimestampEntities {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CommissionsEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CommissionsEntity.prototype, "commissionCredit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CommissionsEntity.prototype, "primeCredit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CommissionsEntity.prototype, "nouveauCredit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CommissionsEntity.prototype, "palierCredit", void 0);
__decorate([
    typeorm_1.Column({
        default: false
    }),
    __metadata("design:type", Boolean)
], CommissionsEntity.prototype, "used", void 0);
__decorate([
    typeorm_1.ManyToOne(type => model_entity_1.ModelEntity, (model) => model.commissions, {
        eager: true
    }),
    __metadata("design:type", model_entity_1.ModelEntity)
], CommissionsEntity.prototype, "model", void 0);
CommissionsEntity = __decorate([
    typeorm_1.Entity('commission')
], CommissionsEntity);
exports.CommissionsEntity = CommissionsEntity;
//# sourceMappingURL=commissions.entity.js.map