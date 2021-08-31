import { Repository } from 'typeorm';
import { PaiementEntity } from './entities/paiement.entity';
export declare class PaiementService {
    private paiementRepository;
    constructor(paiementRepository: Repository<PaiementEntity>);
    countPay(): Promise<number>;
    getListPaiement(flux: string, range: number, page: number, filter?: string): Promise<PaiementEntity[]>;
    buyPack(idClient: number, pseudoClient: string, emailClient: string, credit: number): Promise<PaiementEntity[]>;
    payModel(idModel: number, pseudo: string, email: string, credit: number): Promise<{
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
    convertCreditToMoney(credit: number): number;
}
