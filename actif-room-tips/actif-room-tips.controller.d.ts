import { ClientEntity } from 'src/users/client/entities/client.entity';
import { ActifRoomTipsService } from './actif-room-tips.service';
import { AddActifTipsDto } from './dto/add-actif-tips.dto';
export declare class ActifRoomTipsController {
    private readonly actifRoomTipsService;
    constructor(actifRoomTipsService: ActifRoomTipsService);
    updateActif(user: ClientEntity, data: AddActifTipsDto): Promise<import("typeorm").DeleteResult | import("./entities/actif-room-tips.entity").ActifRoomTipsEntity>;
    getAll(): Promise<import("./entities/actif-room-tips.entity").ActifRoomTipsEntity[]>;
    getActifsRoom(id: any): Promise<import("./entities/actif-room-tips.entity").ActifRoomTipsEntity[]>;
}
