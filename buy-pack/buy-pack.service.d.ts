import { ClientEntity } from 'src/users/client/entities/client.entity';
import { Repository } from 'typeorm';
import { AddBuyPackDto } from './dto/add-buy-pack.dto';
import { BuyPackEntity } from './entities/buy-pack.entity';
import { ClientService } from '../users/client/client.service';
export declare class BuyPackService {
    private buyPackRepository;
    private clientService;
    constructor(buyPackRepository: Repository<BuyPackEntity>, clientService: ClientService);
    addBuyPack(client: ClientEntity, data: AddBuyPackDto): Promise<BuyPackEntity | {
        error: boolean;
        message: string;
    }>;
    getBuyPacks(): Promise<BuyPackEntity[]>;
    verifyPack(client: ClientEntity): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
}
