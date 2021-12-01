import { MailService } from './mail.service';
export declare class MailController {
    private mailService;
    constructor(mailService: MailService);
    sendMessage(data: any): Promise<void>;
}
