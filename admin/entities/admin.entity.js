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
exports.AdminEntity = void 0;
const user_role_enum_1 = require("../../enums/user-role.enum");
const typeorm_1 = require("typeorm");
const timestamp_entities_1 = require("../../generics/timestamp.entities");
let AdminEntity = class AdminEntity extends timestamp_entities_1.TimestampEntities {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AdminEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        unique: true
    }),
    __metadata("design:type", String)
], AdminEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        default: 'Admin'
    }),
    __metadata("design:type", String)
], AdminEntity.prototype, "pseudo", void 0);
__decorate([
    typeorm_1.Column({
        default: './../../../../../assets/images/user_chat.png'
    }),
    __metadata("design:type", String)
], AdminEntity.prototype, "url", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdminEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdminEntity.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: user_role_enum_1.UserRoleEnum,
        default: user_role_enum_1.UserRoleEnum.ADMIN
    }),
    __metadata("design:type", String)
], AdminEntity.prototype, "role", void 0);
AdminEntity = __decorate([
    typeorm_1.Entity('admin')
], AdminEntity);
exports.AdminEntity = AdminEntity;
//# sourceMappingURL=admin.entity.js.map