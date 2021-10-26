import { AppGateway } from './app.gateway';
export declare class AppService {
    private appGateway;
    constructor(appGateway: AppGateway);
    getHello(): {
        message: string;
    };
}
