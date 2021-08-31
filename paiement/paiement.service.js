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
exports.PaiementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const paiement_entity_1 = require("./entities/paiement.entity");
const flux_enum_1 = require("../enums/flux.enum");
let PaiementService = class PaiementService {
    constructor(paiementRepository) {
        this.paiementRepository = paiementRepository;
    }
    async countPay() {
        return await this.paiementRepository.count();
    }
    async getListPaiement(flux, range, page, filter) {
        const qb = await this.paiementRepository.createQueryBuilder('pay');
        if (!filter) {
            if (flux === 'tous') {
                return await qb.select()
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
            else {
                return await qb.select()
                    .where('flux = :flux', { flux: flux })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
        }
        else {
            if (flux === 'tous') {
                return await qb.select()
                    .where('pseudo like :motif or email like :motif or createdAt like :motif', { motif: '%' + filter + '%' })
                    .offset(range * page)
                    .limit(range)
                    .getMany();
            }
            return await qb.select()
                .where('(pseudo like :motif or email like :motif or createdAt like :motif) and flux = :flux', { motif: '%' + filter + '%', flux: flux })
                .offset(range * page)
                .limit(range)
                .getMany();
        }
    }
    async buyPack(idClient, pseudoClient, emailClient, credit) {
        const pay = {
            type_source: 'client',
            id_source: idClient,
            pseudo: pseudoClient,
            email: emailClient,
            credit,
            montant: this.convertCreditToMoney(credit),
            flux: flux_enum_1.FluxEnum.IN
        };
        const newPay = await this.paiementRepository.create(pay);
        return await this.paiementRepository.save(newPay);
    }
    async payModel(idModel, pseudo, email, credit) {
        const pay = {
            type_source: 'model',
            id_source: idModel,
            pseudo,
            email,
            credit,
            montant: this.convertCreditToMoney(credit),
            flux: flux_enum_1.FluxEnum.OUT
        };
        const newPay = await this.paiementRepository.create(pay);
        await this.paiementRepository.save(newPay);
        return {
            success: true
        };
    }
    async deletePaiement(idPay) {
        const pay = await this.paiementRepository.findOne({ id: idPay });
        if (!pay) {
            return {
                error: true,
                message: 'Paiement inexistant'
            };
        }
        await this.paiementRepository.softDelete({ id: idPay });
        return {
            success: true
        };
    }
    async getChiffreAffaire() {
        const qb = this.paiementRepository.createQueryBuilder('pay');
        const entrant = await qb.select('SUM(credit) as totalEntrant')
            .where('flux = :entrant', { entrant: flux_enum_1.FluxEnum.IN }).getRawOne();
        const sortant = await qb.select('SUM(credit) as totalSortant')
            .where('flux = :sortant', { sortant: flux_enum_1.FluxEnum.OUT }).getRawOne();
        let flowIn = parseInt(entrant.totalEntrant ? entrant.totalEntrant : 0);
        let flowOut = parseInt(sortant.totalSortant ? sortant.totalSortant : 0);
        return {
            credit: flowIn - flowOut,
            montant: this.convertCreditToMoney(flowIn - flowOut) + ' Eur'
        };
    }
    convertCreditToMoney(credit) {
        const money = credit;
        return money;
    }
};
PaiementService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(paiement_entity_1.PaiementEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaiementService);
exports.PaiementService = PaiementService;
//# sourceMappingURL=paiement.service.js.map