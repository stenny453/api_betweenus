import { BanishService } from './banish.service';
import { AddBanishDto } from './dto/add-banish.dto';
export declare class BanishController {
    private banishService;
    constructor(banishService: BanishService);
    banish(data: AddBanishDto): Promise<import("./entities/banish.entity").BanishEntity>;
    getBanished(modelId: any): Promise<import("./entities/banish.entity").BanishEntity[]>;
    isBanished(data: AddBanishDto): Promise<{
        authorized: boolean;
    }>;
}
