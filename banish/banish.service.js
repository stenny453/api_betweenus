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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanishService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const banish_entity_1 = require("./entities/banish.entity");
const typeorm_2 = require("typeorm");
const model_service_1 = require("../users/model/model.service");
const client_service_1 = require("../users/client/client.service");
let BanishService = class BanishService {
    constructor(banishRepository, modelService, clientService) {
        this.banishRepository = banishRepository;
        this.modelService = modelService;
        this.clientService = clientService;
    }
    async banish(data) {
        const modelId = data.modelId;
        const clientId = data.clientId;
        const model = await this.modelService.getInfoModel(data.modelId);
        const client = await this.clientService.getInfo(data.clientId);
        if (!model || !client)
            return null;
        let oldBanished = await this.banishRepository.findOne({
            modelId, clientId
        });
        if (oldBanished) {
            const id = oldBanished.id;
            oldBanished.isBanished = true;
            const newBanished = await this.banishRepository.preload(Object.assign({ id }, oldBanished));
            return await this.banishRepository.save(newBanished);
        }
        const newBanished = await this.banishRepository.create(data);
        return await this.banishRepository.save(newBanished);
    }
    async getBanished(modelId) {
        return await this.banishRepository.find({ modelId });
    }
    async isBanished(data) {
        const modelId = data.modelId;
        const clientId = data.clientId;
        const list = await this.banishRepository.find({
            modelId, clientId, isBanished: true
        });
        if (list.length > 0) {
            const result = this.isObsolete(list[0]);
            if (result)
                await this.updateBanish(list[0].id, false);
            return { authorized: result };
        }
        return { authorized: true };
    }
    isObsolete(list) {
        const actually = new Date();
        const actualYear = new Date().getFullYear();
        const actualMonth = new Date().getMonth();
        const actualDate = new Date().getDate();
        const actualHour = new Date().getHours();
        const date = new Date(list.createdAt);
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();
        const currentDate = date.getDate();
        const currentHour = date.getHours();
        const diffYear = (actualYear - currentYear) * 365 * 24;
        const diffMonth = (actualMonth - currentMonth) * 30 * 24;
        const diffDay = (actualDate - currentDate) * 24;
        const diffHour = (actualHour - currentHour);
        const HourExact = diffYear + diffMonth + diffDay + diffHour;
        console.log(HourExact);
        if (HourExact > 24)
            return true;
        else
            return false;
    }
    async updateBanish(banishId, banished) {
        await this.banishRepository.update(banishId, { isBanished: banished });
    }
};
BanishService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(banish_entity_1.BanishEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        model_service_1.ModelService,
        client_service_1.ClientService])
], BanishService);
exports.BanishService = BanishService;
//# sourceMappingURL=banish.service.js.map