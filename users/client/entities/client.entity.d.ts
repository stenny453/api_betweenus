import { TimestampEntities } from '../../../generics/timestamp.entities';
import { CreditEntity } from 'src/credit/entities/credit.entity';
import { TimerEntity } from '../../../timer/entities/timer.entity';
import { ActifRoomPrivateEntity } from 'src/actif-room-private/entities/actif-room-private.entity';
import { BuyPackEntity } from '../../../buy-pack/entities/buy-pack.entity';
import { SubscribeEntity } from '../../../subscribe/entities/subscribe.entity';
import { ActifRoomTipsEntity } from '../../../actif-room-tips/entities/actif-room-tips.entity';
import { SettingEntity } from 'src/setting/entities/setting.entity';
export declare class ClientEntity extends TimestampEntities {
    id: number;
    pseudo: string;
    email: string;
    state: string;
    status: number;
    role: string;
    password: string;
    salt: string;
    credit: CreditEntity;
    timer: TimerEntity;
    rooms: ActifRoomPrivateEntity;
    roomsTips: ActifRoomTipsEntity;
    buyPacks: BuyPackEntity;
    subscribe: SubscribeEntity;
    setting: SettingEntity;
}
