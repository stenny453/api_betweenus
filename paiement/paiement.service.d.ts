import { HttpService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaiementEntity } from './entities/paiement.entity';
import { CentralPayDto } from './dto/centralPay.dto';
import { ClientEntity } from '../users/client/entities/client.entity';
export declare class PaiementService {
    private paiementRepository;
    private httpService;
    constructor(paiementRepository: Repository<PaiementEntity>, httpService: HttpService);
    countPay(): Promise<number>;
    getListPaiement(flux: string, range: number, page: number, filter?: string): Promise<PaiementEntity[]>;
    buyPack(idClient: number, pseudoClient: string, emailClient: string, credit: number): Promise<PaiementEntity[]>;
    payModel(idModel: number, pseudo: string, email: string, credit: number, oldCredit: number, newCredit: number): Promise<{
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
    getChiffreAffaire(): Promise<{
        credit: number;
        montant: string;
    }>;
    convertCreditToMoney(credit: number): string;
    getSuiviPay(modelId: number): Promise<PaiementEntity[]>;
    OpenCentralPay(amount: number, client: ClientEntity): Promise<any>;
    goToCentralPay(client: ClientEntity, data: CentralPayDto): Promise<void>;
    listenPaiementCentralPay(data: any): Promise<void>;
}
