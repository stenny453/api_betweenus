import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/LoginAdminDto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    login(credentials: LoginAdminDto): Promise<{
        error: boolean;
        message: string;
        access_token?: undefined;
    } | {
        access_token: string;
        error?: undefined;
        message?: undefined;
    }>;
    statInscriptionClient(): Promise<any[]>;
    countClient(motif: any): Promise<{
        count: number;
    }>;
    countBlocked(): Promise<number>;
    listAllClients(motif: any, range: any, page: any): Promise<import("../users/client/entities/client.entity").ClientEntity[]>;
    listClients(motif: any, range: any, page: any, filter: any): Promise<import("../users/client/entities/client.entity").ClientEntity[]>;
    listAllClientsBlocked(range: any, page: any): Promise<import("../users/client/entities/client.entity").ClientEntity[]>;
    listClientsBlocked(range: any, page: any, filter: any): Promise<import("../users/client/entities/client.entity").ClientEntity[]>;
    deleteClient(idClient: any): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    blockClient(data: {
        idClient: number;
        reverse: boolean;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    deactivateClient(data: {
        idClient: number;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    activateClient(data: {
        idClient: number;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    statInscriptionModel(): Promise<any[]>;
    statSuppressionModel(): Promise<any[]>;
    countModel(motif: any): Promise<{
        count: number;
    }>;
    countModelBlocked(): Promise<number>;
    listAllModels(motif: any, range: any, page: any): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    listModels(motif: any, range: any, page: any, filter: any): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    listAllModelsBlocked(range: any, page: any): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    listModelsBlocked(range: any, page: any, filter: any): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    deleteModel(idClient: any): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    blockModel(data: {
        idClient: number;
        reverse: boolean;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    deactivateModel(data: {
        idClient: number;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    activateModel(data: {
        idClient: number;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    getModelProfil(status: any): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    getModelProfilFilter(status: any, filter: any): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    countRequestsModel(): Promise<number>;
    getRequestsModel(motif: any, range: any, page: any): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    getAllRequestsModel(motif: any, range: any, page: any, filter: any): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    ResultRequestModel(data: {
        idClient: number;
        accepted: boolean;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    ResultInscriptionModel(data: {
        idClient: number;
        accepted: boolean;
        motif: string;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    getInfosModel(idClient: any): Promise<import("../users/model/entities/model.entity").ModelEntity>;
    countModelActif(): Promise<number>;
    countClientActif(): Promise<number>;
    countModelState(state: any): Promise<number>;
    newLastClients(): Promise<number>;
    newLastModels(): Promise<number>;
    countRoom(type: any): Promise<number>;
    getChiffreAffaire(): Promise<{
        credit: number;
        montant: string;
    }>;
    payCreditModel(data: {
        idModel: number;
        pseudoModel: string;
        emailModel: string;
        credit: number;
        lastPayement: string;
    }): Promise<{
        success: boolean;
    }>;
    payModel(data: {
        idModel: number;
        pseudoModel: string;
        emailModel: string;
        credit: number;
    }): Promise<{
        success: boolean;
    }>;
    getAverageClient(): Promise<any[]>;
    get10LastShowPrivate(): Promise<import("../room-private/entities/room-private.entity").RoomPrivateEntity[]>;
    get10LastShowTips(): Promise<import("../room-tips/entities/room-tips.entity").RoomTipsEntity[]>;
    get10LastShowVIP(): Promise<import("../room-vip/entities/room-vip.entity").RoomVipEntity[]>;
    get10LastShowChoiceUS(): Promise<import("../room-vip/entities/room-vip.entity").RoomVipEntity[]>;
    getTop10Model(): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    getCreditActifsModels(): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    countPay(): Promise<number>;
    getListPaiement(flux: any, range: any, page: any): Promise<import("../paiement/entities/paiement.entity").PaiementEntity[]>;
    getListPaiementWithFilter(flux: any, filter: any, range: any, page: any): Promise<import("../paiement/entities/paiement.entity").PaiementEntity[]>;
    deletePaiement(data: {
        idPay: number;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    getModelsActif(): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    sendMail(data: {
        email: string;
        objet: string;
        message: string;
    }): Promise<{
        success: boolean;
    }>;
    getTaboo(): Promise<import("../taboo/entities/taboo.entity").TabooEntity[]>;
    addTaboo(data: {
        word: string;
    }): Promise<import("../taboo/dto/taboo.dto").TabooDto & import("../taboo/entities/taboo.entity").TabooEntity>;
    deleteTaboo(id: any): Promise<import("typeorm").DeleteResult>;
    GetInfoAdmin(user: any): Promise<import("./entities/admin.entity").AdminEntity>;
    UpdateInfoAdmin(user: any, data: {
        pseudo: string;
        url: string;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    ChangePasswordAdmin(user: any, data: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        message: string;
        success: boolean;
        error?: undefined;
    }>;
}
