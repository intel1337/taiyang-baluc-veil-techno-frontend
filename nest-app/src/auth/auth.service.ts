import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}


    async authUser(token:string): Promise<boolean>{
        if (!process.env.SECRET_KEY) {
            throw new Error('SECRET_KEY non défini dans les variables d\'environnement');
        }
        try {
           
            jwt.verify(token, process.env.SECRET_KEY as string);
            return true;
        } catch (err) {
            throw new Error('Token invalide ou expiré');
        }
    }

    async generateToken(userId: number): Promise<string> {
        if (!process.env.SECRET_KEY) {
            throw new Error('SECRET_KEY non défini dans les variables d\'environnement');
        }
        const payload = { userId };
        return jwt.sign(payload, process.env.SECRET_KEY as jwt.Secret, { expiresIn: 168 * 3600 }); // 1week en secondes
    }

}
