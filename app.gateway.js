"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const room_service_1 = require("./room/room.service");
const model_service_1 = require("./users/model/model.service");
const room_private_service_1 = require("./room-private/room-private.service");
const room_vip_service_1 = require("./room-vip/room-vip.service");
let AppGateway = class AppGateway {
    constructor(roomService, roomPrivateService, roomVipService, modelService) {
        this.roomService = roomService;
        this.roomPrivateService = roomPrivateService;
        this.roomVipService = roomVipService;
        this.modelService = modelService;
        this.logger = new common_1.Logger('AppGateway');
    }
    afterInit(server) {
        this.logger.log('Initialized');
    }
    handleDisconnect(client) {
        this.logger.log(`Disconnected ${client.handshake.address}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Connected ${client.handshake.address}`);
    }
    async handleJoinRoom(client, data) {
        client.join(data.room);
        switch (data.show) {
            case 'free':
                await this.joinFree(data.room, data.clientPseudo, data.clientId);
                break;
            case 'private':
                await this.joinPrivate(data.room, data.clientId, data.clientPseudo, data.clientPeer);
                break;
            case 'vip':
                await this.joinVip(data.room);
                break;
            default:
                break;
        }
    }
    async handleLeaveRoom(client, data) {
        client.leave(data.room);
        switch (data.show) {
            case 'free':
                await this.leaveFree(data.room, data.role, data.clientPseudo, data.clientId);
                break;
            case 'private':
                await this.leavePrivate(data.room, data.role, data.clientId);
                break;
            case 'vip':
                await this.leaveVip(data.room, data.role);
                break;
            default:
                break;
        }
    }
    handleMessage(client, data) {
        this.server.emit(`message ${data.room}`, data.message);
    }
    async handlePassToPrivate(client, data) {
        this.server.emit(`Pass to private ${data.room}`, data);
        this.leaveFree(data.room, '');
    }
    async handlePassToTips(client, data) {
        this.server.emit(`Pass to tips ${data.room}`, data);
        this.leaveFree(data.room, '');
    }
    async handlePassToVIP(client, data) {
        this.server.emit(`Pass to VIP ${data.room}`, data);
        this.leaveFree(data.room, '');
    }
    async handleInvitationVIP(client, data) {
        this.server.emit(`pass VIP ${data.clientId} ${data.room}`, data);
    }
    async joinFree(room, clientPseudo, clientId) {
        return await this.roomService.updateActif(room, true).then((back) => {
            const data = {
                room,
                clientPseudo,
                clientId,
                count: back
            };
            this.server.emit(`joined ${room}`, data);
        });
    }
    async joinPrivate(room, clientId, clientPseudo, clientPeer) {
        return await this.roomPrivateService.updateActif(room, true).then((actif) => {
            const data = {
                actif: actif,
                id: clientId,
                pseudo: clientPseudo,
                peerId: clientPeer
            };
            this.server.emit(`joined ${room}`, data);
        });
    }
    async joinVip(room) {
        return await this.roomVipService.updateActif(room, true).then((actif) => {
            this.server.emit(`joined ${room}`, actif);
        });
    }
    async leaveFree(room, role, clientPseudo, clientId) {
        await this.roomService.updateActif(room, false).then((back) => {
            const data = {
                room,
                clientPseudo,
                clientId,
                count: back
            };
            this.server.emit(`leaved ${room}`, data);
            if (role === 'model') {
                this.server.emit(`model leaved ${room}`, back);
            }
        });
    }
    async leavePrivate(room, role, clientId) {
        await this.roomPrivateService.updateActif(room, false).then((back) => {
            const data = {
                clientId
            };
            this.server.emit(`leaved ${room}`, data);
            if (role === 'model') {
                this.server.emit(`model leaved ${room}`, back);
            }
        });
    }
    async leaveVip(room, role) {
        await this.roomVipService.updateActif(room, false).then((back) => {
            this.server.emit(`leaved ${room}`, back);
            if (role === 'model') {
                this.server.emit(`model leaved ${room}`, back);
            }
        });
    }
    async handlePeerId(client, data) {
        this.server.emit(`peerId ${data.room}`, data);
    }
    async handleAskPeerId(client, data) {
        this.server.emit(`ask peerId ${data.room}`, data);
    }
    async handleAnsPeerId(client, data) {
        this.server.emit(`ans peerId ${data.clientId} ${data.room}`, data);
    }
    async handleNewPeerIdModel(client, data) {
        this.server.emit(`new model peerId ${data.room}`, data);
    }
    async inviteModelToPrivate(client, data) {
        this.server.emit(`invite model to private ${data.roomId} ${data.modelId}`, data);
    }
    async responseInvitationModelToPrivate(client, data) {
        this.server.emit(`response invitation private ${data.roomId} ${data.clientId}`, data);
    }
    async inviteModelToVIP(client, data) {
        this.server.emit(`invite model to vip ${data.roomId} ${data.modelId}`, data);
    }
    async responsePositiveInvitationModelToVIP(client, data) {
        this.server.emit(`response positive invitation model to vip ${data.roomId} ${data.clientId}`, data);
    }
    async responseNegativeInvitationModelToVIP(client, data) {
        this.server.emit(`response negative invitation model to vip ${data.roomId} ${data.clientId}`, data);
    }
    async ToggleAudio(client, data) {
        this.server.emit(`Toggle audio ${data.roomId}`, data);
    }
    async ToggleVideo(client, data) {
        this.server.emit(`Toggle video ${data.roomId}`, data);
    }
    async AskModelStream(client, data) {
        this.server.emit(`Ask current model stream ${data.roomId} ${data.modelId}`, data);
    }
    async AnswerModelStream(client, data) {
        this.server.emit(`Answer current model stream ${data.roomId} ${data.clientId}`, data);
    }
    async BanishClient(client, data) {
        this.server.emit(`Banish client ${data.roomId} ${data.clientId}`, data);
    }
    async askCurrentSaloon(client, data) {
        this.server.emit(`ask currentSaloon ${data.idRoom} ${data.modelId}`, data);
    }
    async sendCurrentSaloon(client, data) {
        this.server.emit(`currentSaloon ${data.idRoom}`, data);
    }
    async updatePalier(client, data) {
        this.server.emit(`updatePalier ${data.roomId}`, data);
    }
    async updateChoiceUs(client, data) {
        this.server.emit(`updateChoiceUs ${data.roomId}`, data);
    }
    async newTips(client, data) {
        this.server.emit(`new tips ${data.roomId}`, data);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], AppGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleJoinRoom", null);
__decorate([
    websockets_1.SubscribeMessage('leave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleLeaveRoom", null);
__decorate([
    websockets_1.SubscribeMessage('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleMessage", null);
__decorate([
    websockets_1.SubscribeMessage('Pass to private'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handlePassToPrivate", null);
__decorate([
    websockets_1.SubscribeMessage('Pass to tips'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handlePassToTips", null);
__decorate([
    websockets_1.SubscribeMessage('Pass to VIP'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handlePassToVIP", null);
__decorate([
    websockets_1.SubscribeMessage('Invitation to VIP'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleInvitationVIP", null);
__decorate([
    websockets_1.SubscribeMessage('peerId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _j : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handlePeerId", null);
__decorate([
    websockets_1.SubscribeMessage('ask peerId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _k : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleAskPeerId", null);
__decorate([
    websockets_1.SubscribeMessage('ans peerId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _l : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleAnsPeerId", null);
__decorate([
    websockets_1.SubscribeMessage('new model peerId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _m : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleNewPeerIdModel", null);
__decorate([
    websockets_1.SubscribeMessage('invite model to private'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _o : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "inviteModelToPrivate", null);
__decorate([
    websockets_1.SubscribeMessage('response invitation to private'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _p : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "responseInvitationModelToPrivate", null);
__decorate([
    websockets_1.SubscribeMessage('invite model to vip'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _q : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "inviteModelToVIP", null);
__decorate([
    websockets_1.SubscribeMessage('response positive invitation model to vip'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _r : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "responsePositiveInvitationModelToVIP", null);
__decorate([
    websockets_1.SubscribeMessage('response negative invitation model to vip'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _s : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "responseNegativeInvitationModelToVIP", null);
__decorate([
    websockets_1.SubscribeMessage('Toggle audio'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _t : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "ToggleAudio", null);
__decorate([
    websockets_1.SubscribeMessage('Toggle video'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _u : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "ToggleVideo", null);
__decorate([
    websockets_1.SubscribeMessage('Ask current model stream'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _v : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "AskModelStream", null);
__decorate([
    websockets_1.SubscribeMessage('Answer current model stream'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_w = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _w : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "AnswerModelStream", null);
__decorate([
    websockets_1.SubscribeMessage('Banish client'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _x : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "BanishClient", null);
__decorate([
    websockets_1.SubscribeMessage('ask currentSaloon'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_y = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _y : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "askCurrentSaloon", null);
__decorate([
    websockets_1.SubscribeMessage('currentSaloon'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_z = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _z : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "sendCurrentSaloon", null);
__decorate([
    websockets_1.SubscribeMessage('updatePalier'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_0 = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _0 : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "updatePalier", null);
__decorate([
    websockets_1.SubscribeMessage('updateChoiceUs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_1 = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _1 : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "updateChoiceUs", null);
__decorate([
    websockets_1.SubscribeMessage('new tips'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_2 = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _2 : Object, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "newTips", null);
AppGateway = __decorate([
    websockets_1.WebSocketGateway(4000),
    __metadata("design:paramtypes", [room_service_1.RoomService,
        room_private_service_1.RoomPrivateService,
        room_vip_service_1.RoomVipService,
        model_service_1.ModelService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map