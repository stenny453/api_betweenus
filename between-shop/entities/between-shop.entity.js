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
exports.BetweenShopEntity = void 0;
const typeorm_1 = require("typeorm");
const timestamp_entities_1 = require("../../generics/timestamp.entities");
let BetweenShopEntity = class BetweenShopEntity extends timestamp_entities_1.TimestampEntities {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BetweenShopEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BetweenShopEntity.prototype, "clientId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BetweenShopEntity.prototype, "symbol", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BetweenShopEntity.prototype, "price", void 0);
BetweenShopEntity = __decorate([
    typeorm_1.Entity('between-shop')
], BetweenShopEntity);
exports.BetweenShopEntity = BetweenShopEntity;
//# sourceMappingURL=between-shop.entity.js.map