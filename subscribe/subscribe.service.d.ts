import { Repository } from 'typeorm';
import { SubscribeEntity } from './entities/subscribe.entity';
import { AddSubscribeDto } from './dto/add-subscribe.dto';
import { ClientService } from '../users/client/client.service';
import { ClientEntity } from '../users/client/entities/client.entity';
export declare class SubscribeService {
    private subscribeRepository;
    private clientService;
    constructor(subscribeRepository: Repository<SubscribeEntity>, clientService: ClientService);
    newSubscribe(clientId: number, data: AddSubscribeDto): Promise<SubscribeEntity | {
        error: boolean;
        message: string;
    }>;
    updateSubscribe(client: ClientEntity, data: AddSubscribeDto): Promise<SubscribeEntity | {
        error: boolean;
        message: string;
    }>;
    createSubscribe(client: ClientEntity, data: AddSubscribeDto): Promise<{
        client: ClientEntity;
        price: number;
        lastDate: Date;
    } & SubscribeEntity>;
    isSubscribed(clientId: number): Promise<{
        subscribed: boolean;
        expired: boolean;
        subscribe: SubscribeEntity;
        rest: number;
    }>;
}
