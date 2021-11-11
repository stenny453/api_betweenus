import { RoomVipService } from './room-vip.service';
export declare class RoomVipController {
    private readonly roomVipService;
    constructor(roomVipService: RoomVipService);
    getColor(): {
        color: string;
    };
    getInfoClient(id: any): Promise<Partial<import("../users/client/entities/client.entity").ClientEntity>>;
    getRoomModel(id: any): Promise<{
        idRoom: any;
        actif: number;
        clientId?: undefined;
        gain?: undefined;
        mini?: undefined;
        bronze?: undefined;
        argent?: undefined;
        or?: undefined;
        free?: undefined;
        title?: undefined;
        description?: undefined;
    } | {
        idRoom: number;
        actif: number;
        clientId: number;
        gain: number;
        mini: number;
        bronze: number;
        argent: number;
        or: number;
        free: number;
        title: string;
        description: string;
    }>;
    createRoom(model: any, data: {
        clientId: number;
        special?: string;
    }): Promise<{
        room: number;
    }>;
    updatePalier(model: any, data: {
        roomId: number;
        mini: number;
        bronze: number;
        argent: number;
        or: number;
    }): Promise<import("./entities/room-vip.entity").RoomVipEntity>;
    updateChoiceUs(model: any, data: {
        roomId: number;
        title: string;
        description: string;
        tarif: number;
    }): Promise<import("./entities/room-vip.entity").RoomVipEntity>;
    updateGain(client: any, data: {
        roomId: number;
        gain: number;
    }): Promise<false | import("./entities/room-vip.entity").RoomVipEntity>;
    getGain(id: any): Promise<import("./entities/room-vip.entity").RoomVipEntity[]>;
    getRoom(id: any): Promise<import("./entities/room-vip.entity").RoomVipEntity>;
}
