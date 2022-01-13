import { SubscribeService } from './../subscribe/subscribe.service';
import { ModelService } from 'src/users/model/model.service';
import { Repository } from 'typeorm';
import { CreditEntity } from './entities/credit.entity';
import { ModelEntity } from '../users/model/entities/model.entity';
import { CreditDto } from './dto/credit.dto';
import { ClientService } from '../users/client/client.service';
import { AddCreditClientDto } from './dto/add-credit-client.dto';
import { ClientEntity } from '../users/client/entities/client.entity';
import { CommissionsService } from '../commissions/commissions.service';
export declare class CreditService {
    private creditRepository;
    private modelService;
    private clientService;
    private subscribeService;
    private commissionService;
    constructor(creditRepository: Repository<CreditEntity>, modelService: ModelService, clientService: ClientService, subscribeService: SubscribeService, commissionService: CommissionsService);
    getCreditModel(model: ModelEntity): Promise<any>;
    getCreditClient(client: ClientEntity): Promise<any>;
    createCredit(id: number): Promise<any>;
    createCreditClient(id: number): Promise<any>;
    updateCredit(id: number, credit: CreditDto, client: any): Promise<Partial<CreditEntity>>;
    buyCreditClient(credit: AddCreditClientDto, clientId: number): Promise<Partial<CreditEntity>>;
    saveLastPayment(id: number, lastPayment: string, client: any): Promise<CreditEntity>;
    buyGift(clientId: number, modelId: number, credit: number): Promise<{
        success: boolean;
        creditClient: number;
    }>;
    payItemVIP(clientId: number, creditVIP: number): Promise<CreditEntity>;
    buyCreditShopVIP(clientId: number, creditId: number, montantVIP: number, creditGain: number): Promise<CreditEntity>;
    debiterCredit(creditId: number, credit: number): Promise<{
        success: boolean;
    }>;
}
