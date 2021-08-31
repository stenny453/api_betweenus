import { PaiementService } from './paiement.service';
import { ClientEntity } from '../users/client/entities/client.entity';
export declare class PaiementController {
    private paiementService;
    constructor(paiementService: PaiementService);
    buyPack(client: ClientEntity, data: {
        credit: number;
    }): Promise<any>;
}
