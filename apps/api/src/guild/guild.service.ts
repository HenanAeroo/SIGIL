import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuildDto } from './dto/create-guild.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GuildService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateGuildDto) {
    const guild = await this.prisma.client.guild.create({
      data: {
        discordId: dto.discordId,
        serverName: dto.serverName,
      },
    });
    return guild;
  }

  async findAll() {
    const guilds = await this.prisma.client.guild.findMany();

    return guilds;
  }

  async findOne(id: string) {
    const guildId = await this.prisma.client.guild.findUnique({
      where: { id },
    });

    if (!guildId) {
      throw new NotFoundException('Aucun serveur trouvé');
    } else {
      return guildId;
    }
  }
}
