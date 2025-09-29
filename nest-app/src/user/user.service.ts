import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import type { CreateUserDto, User, UserResponseDto, UserPublicDto } from '../models/users.dto';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly _authservice: AuthService
    ) {}

  
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 12; // Nombre de rounds pour le salt (plus élevé = plus sécurisé mais plus lent)
        return await bcrypt.hash(password, saltRounds);
    }

    async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    private excludePassword(user: User): UserResponseDto {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    private toPublicUser(user: User): UserPublicDto {
        return {
            id: user.id,
            username: user.username,
            name: user.name
        };
    }

    async createUser(_user: CreateUserDto): Promise<any> {
        console.log(`🔐 UserService: Création d'utilisateur avec mot de passe hashé`);
        

        const hashedPassword = await this.hashPassword(_user.password);
        
        console.log(`✅ UserService: Mot de passe hashé avec succès`);
        
        const user = await this.prisma.user.create({
            data: {
                ..._user,
                password: hashedPassword, 
            },
        });

        
        console.log(`✅ UserService: Utilisateur créé - ID: ${user.id}, Username: ${user.username}`);
        return {
            ...this.excludePassword(user),
            token: await this._authservice.generateToken(user.id)
        };
        

    }

    async getUserById(_id: number): Promise<UserPublicDto | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: _id,
            },
        });
        
        if (!user) return null;
        return this.toPublicUser(user);
    }


    async getUserByIdInternal(_id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                id: _id,
            },
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    /**
     * 🔐 Méthode de connexion simple avec vérification bcrypt
     */
    async login(email: string, password: string): Promise<{
        success: boolean;
        user?: UserResponseDto;
        token?: string;
        message: string;
    }> {
        console.log(`🚪 UserService: Tentative de connexion pour ${email}`);
        
        // 1. Récupérer l'utilisateur avec son mot de passe hashé
        const user = await this.getUserByEmail(email);
        
        if (!user) {
            console.log(`❌ UserService: Utilisateur non trouvé`);
            return {
                success: false,
                message: 'Email ou mot de passe incorrect'
            };
        }

        // 2. Vérifier le mot de passe avec bcrypt
        const isPasswordValid = await this.verifyPassword(password, user.password);
        
        if (!isPasswordValid) {
            console.log(`❌ UserService: Mot de passe incorrect`);
            return {
                success: false,
                message: 'Email ou mot de passe incorrect'
            };
        }

        console.log(`✅ UserService: Connexion réussie pour ${user.username}`);
        
        // 3. Générer le JWT pour l'utilisateur connecté
        const token = await this._authservice.generateToken(user.id);
        console.log(`🔑 UserService: JWT généré pour l'utilisateur ${user.username}`);
        
        return {
            success: true,
            user: this.excludePassword(user),
            token: token,
            message: 'Connexion réussie'
        };
    }
}