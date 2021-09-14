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
exports.BanishEntity = void 0;
const typeorm_1 = require("typeorm");
const timestamp_entities_1 = require("../../generics/timestamp.entities");
let BanishEntity = class BanishEntity extends timestamp_entities_1.TimestampEntities {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BanishEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BanishEntity.prototype, "modelId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BanishEntity.prototype, "clientId", void 0);
__decorate([
    typeorm_1.Column({
        default: true
    }),
    __metadata("design:type", Boolean)
], BanishEntity.prototype, "isBanished", void 0);
BanishEntity = __decorate([
    typeorm_1.Entity('banish')
], BanishEntity);
exports.BanishEntity = BanishEntity;
//# sourceMappingURL=banish.entity.js.map