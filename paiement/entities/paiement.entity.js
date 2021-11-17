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
exports.PaiementEntity = void 0;
const typeorm_1 = require("typeorm");
const timestamp_entities_1 = require("../../generics/timestamp.entities");
const user_role_enum_1 = require("../../enums/user-role.enum");
const flux_enum_1 = require("../../enums/flux.enum");
let PaiementEntity = class PaiementEntity extends timestamp_entities_1.TimestampEntities {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PaiementEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PaiementEntity.prototype, "type_source", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PaiementEntity.prototype, "id_source", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PaiementEntity.prototype, "pseudo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PaiementEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PaiementEntity.prototype, "credit", void 0);
__decorate([
    typeorm_1.Column({
        default: 0
    }),
    __metadata("design:type", Number)
], PaiementEntity.prototype, "oldCredit", void 0);
__decorate([
    typeorm_1.Column({
        default: 0
    }),
    __metadata("design:type", Number)
], PaiementEntity.prototype, "newCredit", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], PaiementEntity.prototype, "montant", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: flux_enum_1.FluxEnum,
        default: flux_enum_1.FluxEnum.IN
    }),
    __metadata("design:type", String)
], PaiementEntity.prototype, "flux", void 0);
PaiementEntity = __decorate([
    typeorm_1.Entity('paiement')
], PaiementEntity);
exports.PaiementEntity = PaiementEntity;
//# sourceMappingURL=paiement.entity.js.map