import { CreditService } from './credit.service';
import { CreditDto } from './dto/credit.dto';
import { CreditEntity } from './entities/credit.entity';
import { AddCreditClientDto } from './dto/add-credit-client.dto';
import { ClientEntity } from '../users/client/entities/client.entity';
export declare class CreditController {
    private readonly creditService;
    constructor(creditService: CreditService);
    getCredit(model: any): Promise<CreditEntity>;
    getCreditClient(client: any): Promise<CreditEntity>;
    createCredit(id: any): Promise<any>;
    buyGift(data: {
        clientId: number;
        modelId: number;
        credit: number;
    }): Promise<{
        success: boolean;
        creditClient: number;
    }>;
    createCreditClient(id: any): Promise<any>;
    buyCreditClient(client: ClientEntity, data: AddCreditClientDto): Promise<Partial<CreditEntity>>;
    updateCredit(credit: CreditDto, id: any, model: any): Promise<Partial<CreditEntity>>;
    buyCreditShopVIP(client: ClientEntity, data: {
        creditId: number;
        montantVIP: number;
        creditGain: number;
    }): Promise<CreditEntity>;
}
