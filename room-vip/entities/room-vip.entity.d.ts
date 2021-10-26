import { TimestampEntities } from "src/generics/timestamp.entities";
import { ModelEntity } from "src/users/model/entities/model.entity";
export declare class RoomVipEntity extends TimestampEntities {
    id: number;
    actif: number;
    gain: number;
    mini: number;
    bronze: number;
    argent: number;
    or: number;
    free: number;
    title: string;
    description: string;
    clientId: number;
    model: ModelEntity;
}
