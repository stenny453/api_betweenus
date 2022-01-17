import { ModelEntity } from 'src/users/model/entities/model.entity';
import { ModelService } from 'src/users/model/model.service';
import { Repository } from 'typeorm';
import { CommissionsEntity } from './entities/commissions.entity';
export declare class CommissionsService {
    private commissionRepository;
    private modelService;
    constructor(commissionRepository: Repository<CommissionsEntity>, modelService: ModelService);
    isCommission(modelId: number, creditModel: number): Promise<number>;
    getModelCommission(modelId: number): Promise<CommissionsEntity[]>;
    getAllCommissions(): Promise<CommissionsEntity[]>;
    getCommissionPrime(credit: number): Promise<{
        palier: number;
        primeCredit: number;
    }>;
    getCommissionOverPalier(palier: number, model: ModelEntity): Promise<CommissionsEntity[]>;
}
