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
exports.RoomTipsService = void 0;
const model_entity_1 = require("../users/model/entities/model.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const room_tips_entity_1 = require("./entities/room-tips.entity");
const credit_service_1 = require("../credit/credit.service");
const profile_service_1 = require("../profil/profile.service");
const status_model_enum_1 = require("../enums/status-model.enum");
const model_service_1 = require("../users/model/model.service");
let RoomTipsService = class RoomTipsService {
    constructor(roomTipsRepository, creditService, profileService, modelService) {
        this.roomTipsRepository = roomTipsRepository;
        this.creditService = creditService;
        this.profileService = profileService;
        this.modelService = modelService;
    }
    async payCostToEnter(creditId, credit) {
        return await this.creditService.debiterCredit(creditId, credit);
    }
    async createRoom(model, data) {
        const newRoom = await this.roomTipsRepository.create({
            model,
            tips: data.tips,
            descriptions: data.description
        });
        const room = await this.roomTipsRepository.save(newRoom);
        await this.profileService.updateProfil(model.profile.id, { status: status_model_enum_1.StatusModelEnum.LIVE_TIPS }, model);
        return {
            room: room.id
        };
    }
    async getLastRoom(id) {
        const model = await this.modelService.getModel(id);
        if (!model)
            return null;
        const rooms = await (await this.roomTipsRepository.find({ model })).sort((obj1, obj2) => {
            if (obj1.id > obj2.id) {
                return 1;
            }
            if (obj1.id < obj2.id) {
                return -1;
            }
            return 0;
        });
        if (rooms.length <= 0) {
            return {
                idRoom: null,
                actif: 0
            };
        }
        const result = rooms[rooms.length - 1];
        return result;
    }
    async updateActif(client, data) {
        const room = await this.roomTipsRepository.preload({
            id: data.roomId
        });
        if (!room)
            return null;
        console.log('Joined from ');
        room.actif = data.joined ? room.actif + 1 : room.actif - 1;
        if (room.actif < 0)
            room.actif = 0;
        if (data.role === 'model')
            room.status = 'close';
        return await this.roomTipsRepository.save(room);
    }
    async getStatRoom(idRoom) {
        const room = await this.roomTipsRepository.findOne({ id: idRoom });
        if (!room)
            return null;
        return {
            gain: room.gain,
            actif: room.actif
        };
    }
    async updateGain(idRoom, gain) {
        const id = idRoom;
        const room = await this.roomTipsRepository.findOne({ id });
        if (!room)
            return false;
        const updateRoom = {
            gain: room.gain + gain
        };
        const newRoom = await this.roomTipsRepository.preload(Object.assign({ id }, updateRoom));
        return await this.roomTipsRepository.save(newRoom);
    }
    async getRoom(id) {
        return await this.roomTipsRepository.findOne({ id });
    }
    async get10LastShow() {
        const qb = await this.roomTipsRepository.createQueryBuilder('room');
        let taille = await this.roomTipsRepository.count();
        taille = taille - 10;
        const debut = taille < 0 ? 0 : taille;
        return await qb.select()
            .leftJoinAndSelect('room.model', 'model')
            .leftJoinAndSelect('room.clients', 'clients')
            .groupBy('room.id DESC')
            .getMany();
    }
    async getLastDescriptions(model) {
        const result = await this.roomTipsRepository.find({ model });
        console.log(result);
        const last = result.length > 0 ? result[result.length - 1] : result[0];
        console.log('last ', result);
        const { tips, descriptions } = last;
        console.log(tips, descriptions);
        return {
            tips,
            descriptions
        };
    }
};
RoomTipsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(room_tips_entity_1.RoomTipsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        credit_service_1.CreditService,
        profile_service_1.ProfileService,
        model_service_1.ModelService])
], RoomTipsService);
exports.RoomTipsService = RoomTipsService;
//# sourceMappingURL=room-tips.service.js.map