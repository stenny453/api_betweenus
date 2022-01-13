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
exports.CommissionsService = void 0;
const model_entity_1 = require("../users/model/entities/model.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const model_service_1 = require("../users/model/model.service");
const typeorm_2 = require("typeorm");
const commissions_entity_1 = require("./entities/commissions.entity");
const commissionsPrimes = [
    { palier: 1, commissionCredit: 3401, commissionEuro: 500, primeCredit: 68, primeEuro: 10 },
    { palier: 2, commissionCredit: 6803, commissionEuro: 1000, primeCredit: 340, primeEuro: 50 },
    { palier: 3, commissionCredit: 10204, commissionEuro: 1500, primeCredit: 510, primeEuro: 75 },
    { palier: 4, commissionCredit: 13605, commissionEuro: 2000, primeCredit: 680, primeEuro: 100 },
    { palier: 5, commissionCredit: 19048, commissionEuro: 2800, primeCredit: 816, primeEuro: 120 },
    { palier: 6, commissionCredit: 23810, commissionEuro: 3500, primeCredit: 1020, primeEuro: 150 },
    { palier: 7, commissionCredit: 28571, commissionEuro: 4200, primeCredit: 1224, primeEuro: 180 },
    { palier: 8, commissionCredit: 33333, commissionEuro: 4900, primeCredit: 1429, primeEuro: 210 },
    { palier: 9, commissionCredit: 38095, commissionEuro: 5600, primeCredit: 1633, primeEuro: 240 },
    { palier: 10, commissionCredit: 42857, commissionEuro: 6300, primeCredit: 1837, primeEuro: 270 },
    { palier: 11, commissionCredit: 47619, commissionEuro: 7000, primeCredit: 2041, primeEuro: 300 },
    { palier: 12, commissionCredit: 52381, commissionEuro: 7700, primeCredit: 2245, primeEuro: 330 },
];
let CommissionsService = class CommissionsService {
    constructor(commissionRepository, modelService) {
        this.commissionRepository = commissionRepository;
        this.modelService = modelService;
    }
    async isCommission(modelId, creditModel) {
        const model = await this.modelService.getInfosModel(modelId);
        if (!model)
            return creditModel;
        const { palier, primeCredit } = await this.getCommissionPrime(creditModel);
        if (palier === 0)
            return creditModel;
        const lastCommission = await this.commissionRepository.findOne({ model, palierCredit: palier, used: true });
        const commissionsOverPalier = await this.getCommissionOverPalier(palier, model);
        await commissionsOverPalier.forEach(async (commission) => {
            await this.commissionRepository.update({ id: commission.id }, { used: false });
        });
        if (!lastCommission) {
            const newCredit = creditModel + primeCredit;
            const newCommission = {
                commissionCredit: creditModel,
                primeCredit: primeCredit,
                nouveauCredit: newCredit,
                palierCredit: palier,
                used: true,
                model: model
            };
            await this.commissionRepository.save(newCommission);
            return newCredit;
        }
        return creditModel;
    }
    async getModelCommission(modelId) {
        const model = await this.modelService.getInfoModel(modelId);
        return await this.commissionRepository.find({ model });
    }
    async getAllCommissions() {
        return await this.commissionRepository.find();
    }
    async getCommissionPrime(credit) {
        let commission = {
            palier: 0,
            primeCredit: 0
        };
        const result = await commissionsPrimes.forEach(item => {
            if (item.commissionCredit <= credit) {
                commission = item;
            }
        });
        return commission;
    }
    async getCommissionOverPalier(palier, model) {
        const qb = this.commissionRepository.createQueryBuilder('commission');
        return await qb.select()
            .innerJoinAndSelect('commission.model', 'model')
            .where("model.id = :modelId and palierCredit > :palier and used = :used", { modelId: model.id, palier: palier, used: true })
            .getMany();
    }
};
CommissionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(commissions_entity_1.CommissionsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        model_service_1.ModelService])
], CommissionsService);
exports.CommissionsService = CommissionsService;
//# sourceMappingURL=commissions.service.js.map