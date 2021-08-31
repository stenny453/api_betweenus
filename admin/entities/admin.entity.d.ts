import { TimestampEntities } from '../../generics/timestamp.entities';
export declare class AdminEntity extends TimestampEntities {
    id: number;
    email: string;
    pseudo: string;
    url: string;
    password: string;
    salt: string;
    role: string;
}
