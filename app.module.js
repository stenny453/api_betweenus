"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const client_module_1 = require("./users/client/client.module");
const model_module_1 = require("./users/model/model.module");
const dotenv = require("dotenv");
const platform_express_1 = require("@nestjs/platform-express");
const album_module_1 = require("./album/album.module");
const profile_module_1 = require("./profil/profile.module");
const setting_module_1 = require("./setting/setting.module");
const log_module_1 = require("./log/log.module");
const credit_module_1 = require("./credit/credit.module");
const room_module_1 = require("./room/room.module");
const chat_module_1 = require("./chat/chat.module");
const app_gateway_1 = require("./app.gateway");
const taboo_module_1 = require("./taboo/taboo.module");
const room_private_module_1 = require("./room-private/room-private.module");
const room_vip_module_1 = require("./room-vip/room-vip.module");
const cost_show_module_1 = require("./cost-show/cost-show.module");
const timer_module_1 = require("./timer/timer.module");
const actif_room_private_module_1 = require("./actif-room-private/actif-room-private.module");
const mail_module_1 = require("./mail/mail.module");
const admin_module_1 = require("./admin/admin.module");
const paiement_module_1 = require("./paiement/paiement.module");
const banish_module_1 = require("./banish/banish.module");
const buy_pack_module_1 = require("./buy-pack/buy-pack.module");
const subscribe_module_1 = require("./subscribe/subscribe.module");
const between_shop_module_1 = require("./between-shop/between-shop.module");
const room_tips_module_1 = require("./room-tips/room-tips.module");
const actif_room_tips_module_1 = require("./actif-room-tips/actif-room-tips.module");
const commissions_module_1 = require("./commissions/commissions.module");
dotenv.config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'passwordWei!',
                database: 'betweenus',
                entities: ['**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            client_module_1.ClientModule,
            model_module_1.ModelModule,
            platform_express_1.MulterModule.register({
                dest: '/var/www/betweenus-live.com/html/uploads/',
                preservePath: true
            }),
            album_module_1.AlbumModule,
            profile_module_1.ProfileModule,
            setting_module_1.SettingModule,
            log_module_1.LogModule,
            credit_module_1.CreditModule,
            room_module_1.RoomModule,
            chat_module_1.ChatModule,
            taboo_module_1.TabooModule,
            room_private_module_1.RoomPrivateModule,
            room_vip_module_1.RoomVipModule,
            cost_show_module_1.CostShowModule,
            timer_module_1.TimerModule,
            actif_room_private_module_1.ActifRoomPrivateModule,
            mail_module_1.MailModule,
            admin_module_1.AdminModule,
            paiement_module_1.PaiementModule,
            banish_module_1.BanishModule,
            buy_pack_module_1.BuyPackModule,
            subscribe_module_1.SubscribeModule,
            between_shop_module_1.BetweenShopModule,
            room_tips_module_1.RoomTipsModule,
            actif_room_tips_module_1.ActifRoomTipsModule,
            commissions_module_1.CommissionsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, app_gateway_1.AppGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map