import { Repository } from 'typeorm';
import { BetweenShopEntity } from './entities/between-shop.entity';
import { AddItemVipDto } from './dto/add-item-vip.dto';
export declare class BetweenShopService {
    private betweenShopRepository;
    constructor(betweenShopRepository: Repository<BetweenShopEntity>);
    addItemVIP(clientId: number, data: AddItemVipDto): Promise<BetweenShopEntity>;
    getListItemsVIP(clientId: number, symbol?: string): Promise<BetweenShopEntity[]>;
}
