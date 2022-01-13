import { ModelEntity } from 'src/users/model/entities/model.entity';
import { CommissionsService } from './commissions.service';
export declare class CommissionsController {
    private readonly commissionService;
    constructor(commissionService: CommissionsService);
    getAllCommissions(model: ModelEntity): Promise<any[]>;
    getModelCommission(model: ModelEntity): Promise<any[]>;
    verifyCommission(model: ModelEntity, data: {
        credit: number;
    }): Promise<any>;
}
