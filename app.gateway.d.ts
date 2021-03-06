import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RoomService } from './room/room.service';
import { ModelService } from './users/model/model.service';
import { RoomPrivateService } from './room-private/room-private.service';
import { RoomVipService } from './room-vip/room-vip.service';
interface ChatSocket {
    room: string;
    role: string;
    id: number;
    message: string;
    pseudo?: string;
    idRoom?: any;
    type_source?: string;
    id_source?: any;
    code_couleur?: any;
    createdAt?: string;
}
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private roomService;
    private roomPrivateService;
    private roomVipService;
    private modelService;
    server: Server;
    private logger;
    constructor(roomService: RoomService, roomPrivateService: RoomPrivateService, roomVipService: RoomVipService, modelService: ModelService);
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleJoinRoom(client: Socket, data: {
        room: string;
        modelId: number;
        show?: string;
        clientId?: number;
        clientPseudo?: string;
        clientPeer?: string;
    }): Promise<void>;
    handleLeaveRoom(client: Socket, data: {
        room: string;
        role: string;
        show?: string;
        clientId?: number;
        clientPseudo?: string;
    }): Promise<void>;
    handleMessage(client: Socket, data: ChatSocket): void;
    handlePassToPrivate(client: Socket, data: {
        room: string;
        role: string;
        id: number;
        pseudo: string;
        message: string;
    }): Promise<void>;
    handlePassToTips(client: Socket, data: {
        room: string;
        role: string;
        id: number;
        pseudo: string;
        message: string;
    }): Promise<void>;
    handlePassToVIP(client: Socket, data: {
        room: string;
        role: string;
        id: number;
        pseudo: string;
        message: string;
    }): Promise<void>;
    handleInvitationVIP(client: Socket, data: {
        room: string;
        role: string;
        clientId: number;
        message: string;
        roomVIP: string;
    }): Promise<void>;
    joinFree(room: string, clientPseudo?: string, clientId?: number): Promise<void>;
    joinPrivate(room: string, clientId: number, clientPseudo: string, clientPeer: string): Promise<void>;
    joinTips(room: string, clientId: number, clientPseudo: string, clientPeer: string): Promise<void>;
    joinVip(room: string): Promise<void>;
    leaveFree(room: string, role: string, clientPseudo?: string, clientId?: number): Promise<void>;
    leavePrivate(room: string, role: string, clientId: number): Promise<void>;
    leaveTips(room: string, role: string, clientId: number): Promise<void>;
    leaveVip(room: string, role: string): Promise<void>;
    handlePeerId(client: Socket, data: {
        peerId: any;
        room: string;
    }): Promise<void>;
    handleAskPeerId(client: Socket, data: {
        peerId: any;
        room: string;
        clientId: number;
    }): Promise<void>;
    handleAnsPeerId(client: Socket, data: {
        peerId: any;
        room: string;
        clientId: number;
    }): Promise<void>;
    handleNewPeerIdModel(client: Socket, data: {
        role: string;
        modelId: number;
        room: string;
        peerId: string;
    }): Promise<void>;
    inviteModelToPrivate(client: Socket, data: {
        roomId: number;
        clientId: number;
        clientPseudo: string;
        modelId: number;
    }): Promise<void>;
    responseInvitationModelToPrivate(client: Socket, data: {
        roomId: number;
        clientId: number;
        modelId: number;
        modelPseudo: string;
    }): Promise<void>;
    inviteModelToVIP(client: Socket, data: {
        roomId: any;
        clientId: number;
        clientPseudo: string;
        modelId: number;
        special?: string;
    }): Promise<void>;
    responsePositiveInvitationModelToVIP(client: Socket, data: {
        roomId: any;
        clientId: number;
        modelId: number;
        modelPseudo: string;
        special?: string;
    }): Promise<void>;
    responseNegativeInvitationModelToVIP(client: Socket, data: {
        roomId: any;
        clientId: number;
        modelId: number;
        modelPseudo: string;
        special?: string;
    }): Promise<void>;
    ToggleAudio(client: Socket, data: {
        roomId: any;
        clientId: number;
        peerId: any;
        modelId: number;
        isAudio: boolean;
    }): Promise<void>;
    ToggleVideo(client: Socket, data: {
        roomId: any;
        clientId: number;
        peerId: any;
        modelId: number;
        isVideo: boolean;
    }): Promise<void>;
    AskModelStream(client: Socket, data: {
        roomId: any;
        clientId: number;
        modelId: number;
    }): Promise<void>;
    AnswerModelStream(client: Socket, data: {
        roomId: any;
        clientId: number;
        modelId: number;
        stream: MediaStream;
    }): Promise<void>;
    BanishClient(client: Socket, data: {
        roomId: any;
        clientId: number;
    }): Promise<void>;
    askCurrentSaloon(client: Socket, data: {
        idRoom: any;
        modelId: number;
    }): Promise<void>;
    sendCurrentSaloon(client: Socket, data: {
        idRoom: any;
        live_selected: string;
    }): Promise<void>;
    updatePalier(client: Socket, data: {
        roomId: any;
        mini: number;
        bronze: number;
        argent: number;
        or: number;
    }): Promise<void>;
    updateChoiceUs(client: Socket, data: {
        roomId: any;
        title: string;
        description: string;
        tarif: number;
    }): Promise<void>;
    newTips(client: Socket, data: {
        roomId: any;
        symbole: string;
        credit: number;
        designation: string;
        vip: boolean;
    }): Promise<void>;
    responseCentralPay(paymentRequestId: string, data: any): Promise<void>;
}
export {};
