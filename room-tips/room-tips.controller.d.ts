import { ModelEntity } from 'src/users/model/entities/model.entity';
import { RoomTipsService } from './room-tips.service';
import { ClientEntity } from '../users/client/entities/client.entity';
import { CreateRoomTipsDto } from './dto/create-room-tips.dto';
export declare class RoomTipsController {
    private roomTipsService;
    constructor(roomTipsService: RoomTipsService);
    payCostToEnter(client: ClientEntity, data: {
        creditId: number;
        credit: number;
    }): Promise<{
        success: boolean;
    }>;
    createRoom(model: ModelEntity, data: CreateRoomTipsDto): Promise<{
        room: number;
    }>;
    getRoomModel(id: any): Promise<import("./entities/room-tips.entity").RoomTipsEntity | {
        idRoom: any;
        actif: number;
    }>;
    updateActif(client: ClientEntity, data: {
        roomId: number;
        joined: boolean;
        type_room: string;
        peerId?: string;
        role?: string;
    }): Promise<import("./entities/room-tips.entity").RoomTipsEntity>;
}
