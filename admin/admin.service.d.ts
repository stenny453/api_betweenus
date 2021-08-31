import { RoomVipService } from './../room-vip/room-vip.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LoginAdminDto } from './dto/LoginAdminDto';
import { AdminEntity } from './entities/admin.entity';
import { ClientService } from '../users/client/client.service';
import { ModelService } from '../users/model/model.service';
import { StatusModelEnum } from '../enums/status-model.enum';
import { RoomPrivateService } from '../room-private/room-private.service';
import { PaiementService } from '../paiement/paiement.service';
import { TimerService } from '../timer/timer.service';
import { CreditService } from '../credit/credit.service';
import { MailService } from '../mail/mail.service';
import { TabooService } from '../taboo/taboo.service';
export declare class AdminService {
    private adminRepository;
    private jwtService;
    private clientService;
    private modelService;
    private roomPrivateService;
    private roomVipService;
    private paiementService;
    private timerService;
    private creditService;
    private mailService;
    private tabooService;
    constructor(adminRepository: Repository<AdminEntity>, jwtService: JwtService, clientService: ClientService, modelService: ModelService, roomPrivateService: RoomPrivateService, roomVipService: RoomVipService, paiementService: PaiementService, timerService: TimerService, creditService: CreditService, mailService: MailService, tabooService: TabooService);
    login(credentials: LoginAdminDto): Promise<{
        error: boolean;
        message: string;
        access_token?: undefined;
    } | {
        access_token: string;
        error?: undefined;
        message?: undefined;
    }>;
    getClients(motif: string, range: number, page: number, filter?: string): Promise<import("../users/client/entities/client.entity").ClientEntity[]>;
    countClients(motif: string): Promise<{
        count: number;
    }>;
    deleteClient(idClient: number): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    blockClient(idClient: number, reverse: boolean): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    deactivateClient(idClient: number): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    activateClient(idClient: number): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    countClientBlocked(): Promise<number>;
    getAllClientBlocked(range: number, page: number, filter?: string): Promise<import("../users/client/entities/client.entity").ClientEntity[]>;
    statInscriptionClient(): Promise<any[]>;
    getModels(motif: string, range: number, page: number, filter?: string): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    countModels(motif: string): Promise<{
        count: number;
    }>;
    deleteModel(idClient: number): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    blockModel(idClient: number, reverse: boolean): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    deactivateModel(idClient: number): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    activateModel(idClient: number): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    countModelBlocked(): Promise<number>;
    getAllModelBlocked(range: number, page: number, filter?: string): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    statInscriptionModel(): Promise<any[]>;
    statSuppressionModel(): Promise<any[]>;
    getModelProfil(status: StatusModelEnum, filter?: string): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    countRequestsModel(): Promise<number>;
    getAllRequestsModel(motif: string, range: number, page: number, filter?: string): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    resultRequestModel(idClient: number, accepted: boolean): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    resultInscriptionModel(idClient: number, accepted: boolean, motif: string): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    getInfosModel(idClient: number): Promise<import("../users/model/entities/model.entity").ModelEntity>;
    countModelActif(): Promise<number>;
    countClientActif(): Promise<number>;
    countModelState(state: string): Promise<number>;
    newLastClients(): Promise<number>;
    newLastModels(): Promise<number>;
    countRoom(motif: string): Promise<number>;
    getChiffreAffaire(): Promise<{
        credit: number;
        montant: string;
    }>;
    getAverageClient(): Promise<any[]>;
    get10LastShowPrivate(): Promise<import("../room-private/entities/room-private.entity").RoomPrivateEntity[]>;
    get10LastShowVIP(): Promise<import("../room-vip/entities/room-vip.entity").RoomVipEntity[]>;
    getTop10Model(): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    countPay(): Promise<number>;
    getListPaiement(flux: string, range: number, page: number, filter?: string): Promise<import("../paiement/entities/paiement.entity").PaiementEntity[]>;
    payModel(idModel: number, pseudoModel: string, emailModel: string, credit: number): Promise<{
        success: boolean;
    }>;
    deletePaiement(idPay: number): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    getModelsActif(): Promise<import("../users/model/entities/model.entity").ModelEntity[]>;
    sendMail(email: string, objet: string, message: string): Promise<{
        success: boolean;
    }>;
    getTaboo(): Promise<import("../taboo/entities/taboo.entity").TabooEntity[]>;
    deleteTaboo(idTaboo: number): Promise<import("typeorm").DeleteResult>;
    addTaboo(word: string): Promise<import("../taboo/dto/taboo.dto").TabooDto & import("../taboo/entities/taboo.entity").TabooEntity>;
    getInfo(idUser: number): Promise<AdminEntity>;
    updateInfo(idUser: number, pseudo: string, url: string): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    changePassword(idUser: number, oldPassword: string, newPassword: string): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        message: string;
        success: boolean;
        error?: undefined;
    }>;
}
