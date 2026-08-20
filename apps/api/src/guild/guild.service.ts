import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGuildDto } from './dto/create-guild.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GuildService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateGuildDto) {
    try {
      const guild = await this.prisma.client.guild.create({
        data: {
          discordId: dto.discordId,
          serverName: dto.serverName,
        },
      });
      return guild;
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'P2002') {
        throw new ConflictException('Ce serveur existe déjà');
      }
      throw error;
    }
  }

  async findAll() {
    const guilds = await this.prisma.client.guild.findMany();

    return guilds;
  }

  async findOne(id: string) {
    const guild = await this.prisma.client.guild.findUnique({
      where: { id },
    });

    if (!guild) {
      throw new NotFoundException('Aucun serveur trouvé');
    }

    return guild;
  }
}
