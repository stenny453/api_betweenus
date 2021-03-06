import { TimestampEntities } from '../../generics/timestamp.entities';
export declare class ChatEntity extends TimestampEntities {
    id: number;
    idRoom: number;
    message: string;
    type_source: string;
    type_chat: string;
    pseudo: string;
    id_source: number;
    code_couleur: string;
    giftSymbol: string;
    giftDesign: string;
    giftSource: string;
}
