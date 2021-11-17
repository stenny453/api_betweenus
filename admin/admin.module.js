"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const admin_entity_1 = require("./entities/admin.entity");
const passport_jwt_admin_strategy_1 = require("./strategy/passport-jwt-admin.strategy");
const client_module_1 = require("../users/client/client.module");
const model_module_1 = require("../users/model/model.module");
const room_private_module_1 = require("../room-private/room-private.module");
const room_vip_module_1 = require("../room-vip/room-vip.module");
const paiement_module_1 = require("../paiement/paiement.module");
const timer_module_1 = require("../timer/timer.module");
const credit_module_1 = require("../credit/credit.module");
const mail_module_1 = require("../mail/mail.module");
const taboo_module_1 = require("../taboo/taboo.module");
const room_tips_module_1 = require("../room-tips/room-tips.module");
const SECRET = 'adminbetweenus@@';
const MODEL_SECRET = 'modelBetweenUs';
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.AdminEntity]),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt'
            }),
            jwt_1.JwtModule.register({
                secret: MODEL_SECRET,
                signOptions: { expiresIn: '86400s' },
            }),
            client_module_1.ClientModule,
            model_module_1.ModelModule,
            room_private_module_1.RoomPrivateModule,
            room_vip_module_1.RoomVipModule,
            room_tips_module_1.RoomTipsModule,
            paiement_module_1.PaiementModule,
            timer_module_1.TimerModule,
            credit_module_1.CreditModule,
            mail_module_1.MailModule,
            taboo_module_1.TabooModule
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [
            admin_service_1.AdminService,
            passport_jwt_admin_strategy_1.JwtAdminStrategy
        ],
        exports: [
            admin_service_1.AdminService
        ]
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map