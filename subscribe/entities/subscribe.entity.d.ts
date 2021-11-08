import { ClientEntity } from '../../users/client/entities/client.entity';
import { TimestampEntities } from '../../generics/timestamp.entities';
export declare class SubscribeEntity extends TimestampEntities {
    id: number;
    client: ClientEntity;
    lastDate: Date;
    price: number;
}
