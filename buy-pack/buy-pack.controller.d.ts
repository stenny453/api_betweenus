import { BuyPackService } from './buy-pack.service';
import { AddBuyPackDto } from './dto/add-buy-pack.dto';
import { ClientEntity } from '../users/client/entities/client.entity';
export declare class BuyPackController {
    private buyPackService;
    constructor(buyPackService: BuyPackService);
    buyPack(data: AddBuyPackDto, client: ClientEntity): Promise<import("./entities/buy-pack.entity").BuyPackEntity | {
        error: boolean;
        message: string;
    }>;
    verifyPack(client: ClientEntity): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        error?: undefined;
        message?: undefined;
    }>;
    hasPaid(client: ClientEntity): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        error: boolean;
        success?: undefined;
    }>;
}
