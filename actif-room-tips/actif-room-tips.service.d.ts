import { ActifRoomTipsEntity } from './entities/actif-room-tips.entity';
import { ClientService } from 'src/users/client/client.service';
import { ClientEntity } from 'src/users/client/entities/client.entity';
import { Repository } from 'typeorm';
import { AddActifTipsDto } from './dto/add-actif-tips.dto';
import { RoomTipsService } from '../room-tips/room-tips.service';
export declare class ActifRoomTipsService {
    private actifRoomTipsRepository;
    private roomTipsService;
    private clientService;
    constructor(actifRoomTipsRepository: Repository<ActifRoomTipsEntity>, roomTipsService: RoomTipsService, clientService: ClientService);
    updateActif(user: ClientEntity, data: AddActifTipsDto): Promise<ActifRoomTipsEntity | import("typeorm").DeleteResult>;
    getAll(): Promise<ActifRoomTipsEntity[]>;
    getActifsRoom(roomId: number): Promise<ActifRoomTipsEntity[]>;
}
