import { MailerService } from '@nestjs-modules/mailer';
import { Message } from './interfaces/message.interface';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    confirmRegisterClient(emailClient: string, pseudoClient: string, token: string): Promise<{
        success: boolean;
    }>;
    forgotPassClient(emailClient: string, pseudoClient: string, token: string): Promise<{
        success: boolean;
    }>;
    confirmRegisterModel(emailClient: string, pseudoClient: string, token: string): Promise<{
        success: boolean;
    }>;
    deactivateAccount(emailClient: string, pseudoClient: string, token: string): Promise<{
        success: boolean;
    }>;
    deleteAccount(emailClient: string, pseudoClient: string, token: string): Promise<{
        success: boolean;
    }>;
    acceptInscriptionModel(emailClient: string, pseudoClient: string): Promise<{
        success: boolean;
    }>;
    rejectInscriptionModel(emailClient: string, pseudoClient: string, motif: string): Promise<{
        success: boolean;
    }>;
    acceptRequestModel(emailClient: string, pseudoClient: string, motif: string): Promise<{
        success: boolean;
    }>;
    rejectRequestModel(emailClient: string, pseudoClient: string, motif: string): Promise<{
        success: boolean;
    }>;
    sendMail(email: string, objet: string, message: string): Promise<{
        success: boolean;
    }>;
    sendMessage(data: Message): Promise<{
        success: boolean;
    }>;
}
