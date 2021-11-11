import { Repository } from 'typeorm';
import { RoomTipsEntity } from './entities/room-tips.entity';
import { ClientEntity } from '../users/client/entities/client.entity';
import { CreditService } from '../credit/credit.service';
import { ModelEntity } from 'src/users/model/entities/model.entity';
import { CreateRoomTipsDto } from './dto/create-room-tips.dto';
import { ProfileService } from '../profil/profile.service';
import { ModelService } from '../users/model/model.service';
export declare class RoomTipsService {
    private roomTipsRepository;
    private creditService;
    private profileService;
    private modelService;
    constructor(roomTipsRepository: Repository<RoomTipsEntity>, creditService: CreditService, profileService: ProfileService, modelService: ModelService);
    payCostToEnter(creditId: number, credit: number): Promise<{
        success: boolean;
    }>;
    createRoom(model: ModelEntity, data: CreateRoomTipsDto): Promise<{
        room: number;
    }>;
    getLastRoom(id: number): Promise<RoomTipsEntity | {
        idRoom: any;
        actif: number;
    }>;
    updateActif(client: ClientEntity, data: {
        roomId: number;
        joined: boolean;
        type_room: string;
        peerId?: string;
        role?: string;
    }): Promise<RoomTipsEntity>;
    getStatRoom(idRoom: number): Promise<{
        gain: number;
        actif: number;
    }>;
    updateGain(idRoom: number, gain: number): Promise<false | RoomTipsEntity>;
    getRoom(id: number): Promise<RoomTipsEntity>;
}
