import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ModelEntity } from './entities/model.entity';
import { ModelRegisterDto } from './dto/model-register.dto';
import { ModelLoginDto } from './dto/model-login.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ModelPasswordDto } from './dto/model-password.dto';
import { GetModelDto } from './dto/get-model.dto';
import { MailService } from '../../mail/mail.service';
import { ReinitPasswordDto } from '../client/dto/reinitPassword.dto';
import { ClientEntity } from '../client/entities/client.entity';
import { ChangePseudoDto } from '../client/dto/changePseudo.dto';
export declare class ModelService {
    private modelRepository;
    private clientRepository;
    private jwtService;
    private mailService;
    constructor(modelRepository: Repository<ModelEntity>, clientRepository: Repository<ClientEntity>, jwtService: JwtService, mailService: MailService);
    isEmailClientExist(email: string): Promise<ModelEntity>;
    register(modelData: ModelRegisterDto): Promise<{
        message: string;
        error: boolean;
        pseudo: boolean;
        email?: undefined;
        id?: undefined;
        password?: undefined;
    } | {
        message: string;
        error: boolean;
        email: boolean;
        pseudo?: undefined;
        id?: undefined;
        password?: undefined;
    } | {
        id: number;
        pseudo: string;
        email: string;
        password: string;
        message?: undefined;
        error?: undefined;
    }>;
    login(credentials: ModelLoginDto): Promise<{
        message: string;
        error: boolean;
        access_token?: undefined;
    } | {
        access_token: string;
        message?: undefined;
        error?: undefined;
    }>;
    changePseudo(model: ModelEntity, data: ChangePseudoDto): Promise<{
        access_token: string;
        id: number;
    }>;
    isOwnerOrAdmin(object: any, model: ModelEntity): boolean;
    getModel(id: number): Promise<ModelEntity>;
    getInfoModel(id: number): Promise<Partial<ModelEntity>>;
    getInfos(model: ModelEntity): Promise<Partial<ModelEntity>>;
    updateModel(id: number, model: ModelEntity): Promise<ModelEntity>;
    updatePartialModel(updateCriteria: any, info: UpdateModelDto): Promise<import("typeorm").UpdateResult>;
    changePassword(credentials: ModelPasswordDto, model: ModelEntity): Promise<{
        message: string;
        success: boolean;
        error?: undefined;
    } | {
        message: string;
        error: boolean;
        success?: undefined;
    }>;
    getListModel(data: GetModelDto): Promise<Partial<ModelEntity>[]>;
    getTotalModel(): Promise<{
        live: number;
        chat: number;
        offline: number;
    }>;
    reinitRoom(id: number): Promise<void>;
    forgot(data: any): Promise<{
        success: boolean;
        message: string;
    }>;
    reinitPassword(data: ReinitPasswordDto): Promise<{
        access_token: string;
    }>;
    getLive(): Promise<Partial<ModelEntity>[]>;
    getNotLive(): Promise<Partial<ModelEntity>[]>;
    requestModel(idClient: number, motif: any): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    countClients(motif: string): Promise<number>;
    countClientBlocked(): Promise<number>;
    getAllClientBlocked(range: number, page: number, filter?: string): Promise<ModelEntity[]>;
    getAllClients(motif: string, range: number, page: number, filter?: string): Promise<ModelEntity[]>;
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
    statInscriptionClient(): Promise<any[]>;
    statSuppressionModel(): Promise<any[]>;
    getModelProfil(status: string, filter?: string): Promise<ModelEntity[]>;
    countRequestsModel(): Promise<number>;
    getAllRequestsModel(motif: string, range: number, page: number, filter?: string): Promise<ModelEntity[]>;
    resultRequestModel(idClient: number, accepted: boolean): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    resultInscriptionModel(idClient: number, accepted: boolean, motif?: string): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    getInfosModel(idClient: number): Promise<ModelEntity>;
    countModelActif(): Promise<number>;
    countModelState(state: string): Promise<number>;
    newLastModels(): Promise<number>;
    getTop10Model(): Promise<ModelEntity[]>;
    getModelsActif(): Promise<ModelEntity[]>;
    getCreditActifsModels(): Promise<ModelEntity[]>;
}
