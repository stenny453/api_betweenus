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
exports.SubscribeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscribe_entity_1 = require("./entities/subscribe.entity");
const client_service_1 = require("../users/client/client.service");
let SubscribeService = class SubscribeService {
    constructor(subscribeRepository, clientService) {
        this.subscribeRepository = subscribeRepository;
        this.clientService = clientService;
    }
    async newSubscribe(clientId, data) {
        const user = await this.clientService.getClient(clientId);
        if (!user) {
            return {
                error: true,
                message: 'Client inexistant'
            };
        }
        const subscribeExist = await this.subscribeRepository.findOne({ client: user });
        if (subscribeExist) {
            return await this.updateSubscribe(user, data);
        }
        else {
            return await this.createSubscribe(user, data);
        }
    }
    async updateSubscribe(client, data) {
        const subscribe = await this.subscribeRepository.findOne({ client: client });
        if (!subscribe) {
            return {
                error: true,
                message: 'Abonnement inexistant'
            };
        }
        const newSubscribe = await this.subscribeRepository.preload(Object.assign({ id: subscribe.id }, data));
        return await this.subscribeRepository.save(newSubscribe);
    }
    async createSubscribe(client, data) {
        const newSub = {
            client: client,
            price: data.price,
            lastDate: data.lastDate
        };
        await this.subscribeRepository.create(newSub);
        return await this.subscribeRepository.save(newSub);
    }
    async isSubscribed(clientId) {
        const user = await this.clientService.getClient(clientId);
        const subscribe = await this.subscribeRepository.findOne({ client: user });
        if (!subscribe) {
            return {
                subscribed: false,
                expired: false,
                subscribe: null,
                rest: 0
            };
        }
        let startDate = subscribe.lastDate.toISOString().toString().substring(0, 10);
        let date1 = new Date();
        let date2 = new Date(startDate);
        let timeMilli = date2.getTime() - date1.getTime();
        let daysBetweensDates = Math.ceil(timeMilli / (1000 * 60 * 60 * 24));
        if (subscribe) {
            return {
                subscribed: true,
                expired: daysBetweensDates <= 0 ? true : false,
                subscribe,
                rest: daysBetweensDates
            };
        }
        else {
            return {
                subscribed: false,
                expired: false,
                subscribe: null,
                rest: daysBetweensDates
            };
        }
    }
};
SubscribeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(subscribe_entity_1.SubscribeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        client_service_1.ClientService])
], SubscribeService);
exports.SubscribeService = SubscribeService;
//# sourceMappingURL=subscribe.service.js.map