import { BetweenShopService } from './between-shop.service';
import { ClientEntity } from '../users/client/entities/client.entity';
import { AddItemVipDto } from './dto/add-item-vip.dto';
export declare class BetweenShopController {
    private betweenShopService;
    constructor(betweenShopService: BetweenShopService);
    addItemVIP(client: ClientEntity, data: AddItemVipDto): Promise<import("./entities/between-shop.entity").BetweenShopEntity>;
    getListItemsVIP(client: ClientEntity): Promise<import("./entities/between-shop.entity").BetweenShopEntity[]>;
    getListItemsVIPWithSymbol(client: ClientEntity, symbol: any): Promise<import("./entities/between-shop.entity").BetweenShopEntity[]>;
}
