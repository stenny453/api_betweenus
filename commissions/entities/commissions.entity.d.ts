import { ModelEntity } from "src/users/model/entities/model.entity";
import { TimestampEntities } from '../../generics/timestamp.entities';
export declare class CommissionsEntity extends TimestampEntities {
    id: number;
    commissionCredit: number;
    primeCredit: number;
    nouveauCredit: number;
    palierCredit: number;
    used: boolean;
    model: ModelEntity;
}
