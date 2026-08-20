import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuildDto } from './dto/create-guild.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GuildService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateGuildDto) {
    return dto;
  }

  findAll() {
    return [];
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
