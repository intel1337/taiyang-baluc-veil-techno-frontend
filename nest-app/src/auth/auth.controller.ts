import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post('verify')
    async authenticate(@Body() token: string): Promise<string> {
        const isValid = await this._authService.authUser(token);
        if (isValid) {
            return 'Authentification réussie';
        } else {
            return 'Authentification échouée';
        }
    }

}
