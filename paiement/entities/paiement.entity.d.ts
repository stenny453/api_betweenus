import { TimestampEntities } from '../../generics/timestamp.entities';
import { UserRoleEnum } from '../../enums/user-role.enum';
export declare class PaiementEntity extends TimestampEntities {
    id: number;
    type_source: UserRoleEnum;
    id_source: number;
    pseudo: string;
    email: string;
    credit: number;
    oldCredit: number;
    newCredit: number;
    montant: string;
    flux: string;
}
