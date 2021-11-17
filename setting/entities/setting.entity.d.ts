import { ModelEntity } from "src/users/model/entities/model.entity";
import { ClientEntity } from '../../users/client/entities/client.entity';
export declare class SettingEntity {
    id: number;
    sound_notification: number;
    mail_notification: number;
    sound_message: number;
    model: ModelEntity;
    client: ClientEntity;
}
