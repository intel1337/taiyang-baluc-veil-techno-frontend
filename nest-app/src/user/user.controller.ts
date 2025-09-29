import { Controller, Get, Body, Post, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import type { CreateUserDto, UserResponseDto, UserPublicDto } from '../models/users.dto';

@Controller('/api/user')
export class UserController {
    constructor(private readonly _userservice: UserService) {}

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() user: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        user?: UserResponseDto;
        error?: string;
    }> {
        try {
            if (!user || typeof user !== 'object') {
                return {
                    statusCode: 400,
                    message: "Données utilisateur invalides"
                };
            }
            
            const userData = await this._userservice.createUser(user);
            return {
                statusCode: 201,
                message: "Utilisateur créé avec succès",
                user: userData
            };
        } catch (err) {
            return {
                statusCode: 400,
                message: "Erreur lors de la création de l'utilisateur",
                error: err?.message || err
            };
        }
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserPublicDto | null> {
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            return null;
        }
        
        return await this._userservice.getUserById(userId);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginData: { email: string; password: string }): Promise<{
        success: boolean;
        user?: UserResponseDto;
        message: string;
    }> {
        console.log(`🚪 UserController: Tentative de connexion pour ${loginData.email}`);
        
        if (!loginData.email || !loginData.password) {
            return {
                success: false,
                message: 'Email et mot de passe requis'
            };
        }

        const result = await this._userservice.login(loginData.email, loginData.password);
        
        console.log(`${result.success ? '✅' : '❌'} UserController: ${result.message}`);
        return result;
    }
}
