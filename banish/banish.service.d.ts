import { BanishEntity } from './entities/banish.entity';
import { Repository } from 'typeorm';
import { ModelService } from '../users/model/model.service';
import { ClientService } from '../users/client/client.service';
import { AddBanishDto } from './dto/add-banish.dto';
export declare class BanishService {
    private banishRepository;
    private modelService;
    private clientService;
    constructor(banishRepository: Repository<BanishEntity>, modelService: ModelService, clientService: ClientService);
    banish(data: AddBanishDto): Promise<BanishEntity>;
    getBanished(modelId: number): Promise<BanishEntity[]>;
    isBanished(data: AddBanishDto): Promise<{
        authorized: boolean;
    }>;
    isObsolete(list: BanishEntity): boolean;
    updateBanish(banishId: number, banished: boolean): Promise<void>;
}
