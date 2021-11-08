import { SubscribeService } from './subscribe.service';
import { AddSubscribeDto } from './dto/add-subscribe.dto';
import { ClientEntity } from '../users/client/entities/client.entity';
export declare class SubscribeController {
    private subscribeService;
    constructor(subscribeService: SubscribeService);
    newSubscribe(client: ClientEntity, data: AddSubscribeDto): Promise<import("./entities/subscribe.entity").SubscribeEntity | {
        error: boolean;
        message: string;
    }>;
    isSubscribed(client: ClientEntity): Promise<{
        subscribed: boolean;
        expired: boolean;
        subscribe: import("./entities/subscribe.entity").SubscribeEntity;
        rest: number;
    }>;
}
