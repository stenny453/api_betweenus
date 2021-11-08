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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditService = void 0;
const subscribe_service_1 = require("./../subscribe/subscribe.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const model_service_1 = require("../users/model/model.service");
const typeorm_2 = require("typeorm");
const credit_entity_1 = require("./entities/credit.entity");
const client_service_1 = require("../users/client/client.service");
const creditVIP = require("./creditVIP.json");
let CreditService = class CreditService {
    constructor(creditRepository, modelService, clientService, subscribeService) {
        this.creditRepository = creditRepository;
        this.modelService = modelService;
        this.clientService = clientService;
        this.subscribeService = subscribeService;
    }
    async getCreditModel(model) {
        const newModel = await this.modelService.getModel(model.id);
        const _a = newModel.credit, { createdAt, deletedAt, updatedAt } = _a, result = __rest(_a, ["createdAt", "deletedAt", "updatedAt"]);
        return result;
    }
    async getCreditClient(client) {
        const newClient = await this.clientService.getClient(client.id);
        const _a = newClient.credit, { createdAt, deletedAt, updatedAt } = _a, result = __rest(_a, ["createdAt", "deletedAt", "updatedAt"]);
        return result;
    }
    async createCredit(id) {
        const model = await this.modelService.getModel(id);
        if (!model) {
            console.log('Model introuvable');
            return null;
        }
        const credit = {
            credit: 0
        };
        const newCredit = await this.creditRepository.save(credit);
        model.credit = newCredit;
        return await this.modelService.updateModel(id, model);
    }
    async createCreditClient(id) {
        const client = await this.clientService.getClient(id);
        if (!client) {
            console.log('Client introuvable');
            return null;
        }
        const credit = {
            credit: 0
        };
        const newCredit = await this.creditRepository.save(credit);
        client.credit = newCredit;
        return await this.clientService.updateClient(id, client);
    }
    async updateCredit(id, credit, client) {
        const newCredit = await this.creditRepository.preload(Object.assign({ id }, credit));
        if (client.credit.id === newCredit.id) {
            if (!newCredit) {
                throw new common_1.NotFoundException(`Le credit d'id ${id} n'existe pas`);
            }
            const newP = await this.creditRepository.save(newCredit);
            return newP;
        }
        else
            throw new common_1.UnauthorizedException();
    }
    async buyCreditClient(credit) {
        const id = credit.creditId;
        let oldCredit = await this.creditRepository.findOne({ id: credit.creditId });
        if (!oldCredit) {
            const newCreditClient = await this.createCreditClient(credit.clientId);
            oldCredit = newCreditClient.credit;
        }
        oldCredit.credit = oldCredit.credit + credit.credit;
        const { subscribed, expired } = await this.subscribeService.isSubscribed(oldCredit.client.id);
        let pointVIP = 0;
        await creditVIP.points.forEach((value) => {
            if (value.credit === credit.credit) {
                if (subscribed && !expired)
                    pointVIP = value.subscribe;
                else
                    pointVIP = value.unsubscribe;
            }
        });
        oldCredit.vip = oldCredit.vip + pointVIP;
        const newCredit = await this.creditRepository.preload(Object.assign({ id }, oldCredit));
        const client = await this.clientService.getClient(credit.clientId);
        if (client.credit.id === newCredit.id) {
            if (!newCredit) {
                throw new common_1.NotFoundException(`Le credit d'id ${id} n'existe pas`);
            }
            const newP = await this.creditRepository.save(newCredit);
            return newP;
        }
        else
            throw new common_1.UnauthorizedException();
    }
    async saveLastPayment(id, lastPayment, client) {
        const data = {
            lastPayment
        };
        const newCredit = await this.creditRepository.preload(Object.assign({ id }, data));
        if (client.credit.id === newCredit.id) {
            if (!newCredit) {
                throw new common_1.NotFoundException(`Le credit d'id ${id} n'existe pas`);
            }
            const newP = await this.creditRepository.save(newCredit);
            return newP;
        }
        else
            throw new common_1.UnauthorizedException();
    }
    async buyGift(clientId, modelId, credit) {
        const client = await this.clientService.getClient(clientId);
        const creditClient = await this.creditRepository.findOne({ id: client.credit.id });
        const model = await this.modelService.getModel(modelId);
        const creditModel = await this.creditRepository.findOne({ id: model.credit.id });
        const newCreditClient = await this.creditRepository.preload(Object.assign({ id: creditClient.id }, creditClient));
        const newCreditModel = await this.creditRepository.preload(Object.assign({ id: creditModel.id }, creditModel));
        newCreditClient.credit = newCreditClient.credit - credit;
        newCreditClient.credit = newCreditClient.credit < 0 ? 0 : newCreditClient.credit;
        newCreditModel.credit = newCreditModel.credit + credit;
        await this.creditRepository.save(newCreditClient);
        await this.creditRepository.save(newCreditModel);
        return {
            success: true,
            creditClient: newCreditClient.credit
        };
    }
    async payItemVIP(clientId, creditVIP) {
        const client = await this.clientService.getClient(clientId);
        const creditClient = await this.creditRepository.findOne({ id: client.credit.id });
        const newCreditClient = await this.creditRepository.preload(Object.assign({ id: creditClient.id }, creditClient));
        newCreditClient.vip = newCreditClient.vip - creditVIP;
        newCreditClient.vip = newCreditClient.vip < 0 ? 0 : newCreditClient.vip;
        return await this.creditRepository.save(newCreditClient);
    }
    async buyCreditShopVIP(clientId, creditId, montantVIP, creditGain) {
        const creditClient = await this.creditRepository.findOne({ id: creditId });
        if (!creditClient) {
            return null;
        }
        const newCreditClient = await this.creditRepository.preload(Object.assign({ id: creditClient.id }, creditClient));
        newCreditClient.vip = newCreditClient.vip - montantVIP;
        newCreditClient.vip = newCreditClient.vip < 0 ? 0 : newCreditClient.vip;
        newCreditClient.credit = newCreditClient.credit + creditGain;
        return await this.creditRepository.save(newCreditClient);
    }
    async debiterCredit(creditId, credit) {
        const creditClient = await this.creditRepository.findOne({ id: creditId });
        if (!creditClient) {
            return null;
        }
        const newCreditClient = await this.creditRepository.preload(Object.assign({ id: creditClient.id }, creditClient));
        newCreditClient.credit = newCreditClient.credit - credit;
        await this.creditRepository.save(newCreditClient);
        return {
            success: true
        };
    }
};
CreditService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(credit_entity_1.CreditEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        model_service_1.ModelService,
        client_service_1.ClientService,
        subscribe_service_1.SubscribeService])
], CreditService);
exports.CreditService = CreditService;
//# sourceMappingURL=credit.service.js.map