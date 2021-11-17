import { SettingEntity } from './entities/setting.entity';
import { ModelService } from '../users/model/model.service';
import { Repository } from 'typeorm';
import { ModelEntity } from '../users/model/entities/model.entity';
import { SettingDto } from './dto/setting.dto';
import { ClientService } from '../users/client/client.service';
import { ClientEntity } from '../users/client/entities/client.entity';
export declare class SettingService {
    private settingRepository;
    private modelService;
    private clientService;
    constructor(settingRepository: Repository<SettingEntity>, modelService: ModelService, clientService: ClientService);
    getModelInfo(model: any): Promise<any>;
    getSettingInfo(model: any): Promise<any>;
    getSettingClient(client: ClientEntity): Promise<any>;
    createSetting(id: number): Promise<ModelEntity>;
    createSettingClient(clientId: number): Promise<SettingEntity>;
    updateSetting(id: number, setting: SettingDto, model: any): Promise<Partial<SettingEntity>>;
}
