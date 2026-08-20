import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { DevLoginDto } from './dto/devLogin.dto.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Connexion via Discord' })
  @ApiResponse({ status: 401, description: 'Identifiant invalide' })
  @Post('dev-login')
  devLogin(@Body() dto: DevLoginDto) {
    return this.authService.devLogin(dto.discordId);
  }
}
