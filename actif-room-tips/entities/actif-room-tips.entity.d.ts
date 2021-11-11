import { RoomTipsEntity } from 'src/room-tips/entities/room-tips.entity';
import { ClientEntity } from 'src/users/client/entities/client.entity';
import { TimestampEntities } from '../../generics/timestamp.entities';
export declare class ActifRoomTipsEntity extends TimestampEntities {
    id: number;
    client: Partial<ClientEntity>;
    type_room: string;
    peerId: string;
    roomTips?: RoomTipsEntity;
}
