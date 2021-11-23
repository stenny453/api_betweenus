import { PaiementService } from './paiement.service';
import { ClientEntity } from '../users/client/entities/client.entity';
import { CentralPayDto } from './dto/centralPay.dto';
export declare class PaiementController {
    private paiementService;
    constructor(paiementService: PaiementService);
    buyPack(client: ClientEntity, data: {
        credit: number;
    }): Promise<any>;
    getSuiviPay(client: ClientEntity, id: any): Promise<import("./entities/paiement.entity").PaiementEntity[]>;
    OpenCentralPay(client: ClientEntity, data: {
        amount: number;
    }): Promise<any>;
    goToCentralPay(client: ClientEntity, data: CentralPayDto): Promise<void>;
    listenPaiementCentralPay(data: any): Promise<void>;
}
