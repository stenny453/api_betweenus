import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { AdminPayloadInterface } from '../interfaces/admin-payload.interface';
declare const JwtAdminStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAdminStrategy extends JwtAdminStrategy_base {
    private adminRepository;
    constructor(adminRepository: Repository<AdminEntity>);
    validate(payload: AdminPayloadInterface): Promise<{
        id: number;
        email: string;
        pseudo: string;
        url: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }>;
}
export {};
