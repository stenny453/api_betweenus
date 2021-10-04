import { TimestampEntities } from '../../generics/timestamp.entities';
import { ClientEntity } from '../../users/client/entities/client.entity';
export declare class BuyPackEntity extends TimestampEntities {
    id: number;
    designation: string;
    idClient: number;
    client: ClientEntity;
    credit: number;
    montant: number;
    card: string;
    mm: string;
    yyyy: string;
    cvv: string;
    firstName: string;
    lastName: string;
    email: string;
}
