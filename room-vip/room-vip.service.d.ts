import { ModelService } from 'src/users/model/model.service';
import { Repository } from 'typeorm';
import { ModelEntity } from '../users/model/entities/model.entity';
import { ClientService } from '../users/client/client.service';
import { RoomVipEntity } from './entities/room-vip.entity';
import { ProfileService } from '../profil/profile.service';
export declare class RoomVipService {
    private roomVipRepository;
    private modelService;
    private clientService;
    private profilService;
    constructor(roomVipRepository: Repository<RoomVipEntity>, modelService: ModelService, clientService: ClientService, profilService: ProfileService);
    getColorCode(): {
        color: string;
    };
    createRoom(model: ModelEntity, data: {
        clientId: number;
        special?: string;
    }): Promise<{
        room: number;
    }>;
    getLastRoom(id: number): Promise<{
        idRoom: any;
        actif: number;
        clientId?: undefined;
        gain?: undefined;
        free?: undefined;
        title?: undefined;
        description?: undefined;
    } | {
        idRoom: number;
        actif: number;
        clientId: number;
        gain: number;
        free: number;
        title: string;
        description: string;
    }>;
    getInfoClient(id: number): Promise<Partial<import("../users/client/entities/client.entity").ClientEntity>>;
    updateActif(idRoom: string, upgrade: boolean): Promise<number>;
    updateGain(idRoom: number, gain: number): Promise<false | RoomVipEntity>;
    getRoom(id: number): Promise<RoomVipEntity>;
    getGain(id: number): Promise<RoomVipEntity[]>;
    countRoom(): Promise<number>;
    get10LastShow(): Promise<RoomVipEntity[]>;
    get10LastShowChoiceUS(): Promise<RoomVipEntity[]>;
    updatePalier(data: {
        roomId: number;
        mini: number;
        bronze: number;
        argent: number;
        or: number;
    }): Promise<void>;
    updateChoiceUs(data: {
        roomId: number;
        title: string;
        description: string;
        tarif: any;
    }): Promise<RoomVipEntity>;
}
