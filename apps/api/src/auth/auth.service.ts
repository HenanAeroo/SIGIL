import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async devLogin(discordId: string) {
    const user = await this.prisma.client.user.findUnique({
      where: { discordId },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiant invalide');
    }

    const accessToken = await this.jwt.signAsync({ sub: user.id });

    return { accessToken };
  }
}
