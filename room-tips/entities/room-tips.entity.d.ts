import { ModelEntity } from 'src/users/model/entities/model.entity';
import { TimestampEntities } from '../../generics/timestamp.entities';
import { ActifRoomTipsEntity } from '../../actif-room-tips/entities/actif-room-tips.entity';
export declare class RoomTipsEntity extends TimestampEntities {
    id: number;
    actif: number;
    gain: number;
    status: string;
    model: ModelEntity;
    tips: string;
    descriptions: string;
    clients: ActifRoomTipsEntity;
}
