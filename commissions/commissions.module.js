"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommissionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const model_module_1 = require("../users/model/model.module");
const commissions_controller_1 = require("./commissions.controller");
const commissions_service_1 = require("./commissions.service");
const commissions_entity_1 = require("./entities/commissions.entity");
let CommissionsModule = class CommissionsModule {
};
CommissionsModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([commissions_entity_1.CommissionsEntity]),
            model_module_1.ModelModule
        ],
        controllers: [commissions_controller_1.CommissionsController],
        providers: [commissions_service_1.CommissionsService],
        exports: [commissions_service_1.CommissionsService]
    })
], CommissionsModule);
exports.CommissionsModule = CommissionsModule;
//# sourceMappingURL=commissions.module.js.map