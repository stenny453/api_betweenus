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
exports.BuyPackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const client_entity_1 = require("../users/client/entities/client.entity");
const typeorm_2 = require("typeorm");
const buy_pack_entity_1 = require("./entities/buy-pack.entity");
const client_service_1 = require("../users/client/client.service");
const pack_enum_1 = require("../enums/pack.enum");
let BuyPackService = class BuyPackService {
    constructor(buyPackRepository, clientService) {
        this.buyPackRepository = buyPackRepository;
        this.clientService = clientService;
    }
    async addBuyPack(client, data) {
        const old_client = await this.clientService.getClient(client.id);
        if (!old_client)
            return null;
        if (data.designation === pack_enum_1.PackEnum.BIENVENUE) {
            const old_welcome_pack = await this.buyPackRepository.findOne({ idClient: client.id, designation: pack_enum_1.PackEnum.BIENVENUE });
            if (old_welcome_pack) {
                return {
                    error: true,
                    message: 'Votre pack de bienvenue a été utilisé'
                };
            }
            const old_card_welcome_pack = await this.buyPackRepository.findOne({ designation: pack_enum_1.PackEnum.BIENVENUE, card: data.card });
            if (old_card_welcome_pack) {
                return {
                    error: true,
                    message: 'Cette carte a été déjà utilisé pour un pack de bienvenue'
                };
            }
        }
        const newBuyPack = await this.buyPackRepository.create();
        newBuyPack.client = old_client;
        newBuyPack.idClient = client.id;
        newBuyPack.designation = data.designation;
        newBuyPack.credit = data.credit;
        newBuyPack.montant = data.montant;
        newBuyPack.card = data.card;
        newBuyPack.mm = data.mm;
        newBuyPack.yyyy = data.yyyy;
        newBuyPack.cvv = data.cvv;
        newBuyPack.firstName = data.firstName;
        newBuyPack.lastName = data.lastName;
        newBuyPack.email = data.email;
        return await this.buyPackRepository.save(newBuyPack);
    }
    async getBuyPacks() {
        return await this.buyPackRepository.find();
    }
    async verifyPack(client) {
        const old_client = await this.buyPackRepository.findOne({ idClient: client.id, designation: pack_enum_1.PackEnum.BIENVENUE });
        if (old_client) {
            return {
                error: true,
                message: 'Pack de bienvenue utilisé'
            };
        }
        else {
            return {
                success: true
            };
        }
    }
};
BuyPackService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(buy_pack_entity_1.BuyPackEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        client_service_1.ClientService])
], BuyPackService);
exports.BuyPackService = BuyPackService;
//# sourceMappingURL=buy-pack.service.js.map