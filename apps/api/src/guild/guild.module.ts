import { Module } from '@nestjs/common';
import { GuildController } from './guild.controller.js';
import { GuildService } from './guild.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [GuildController],
  providers: [GuildService],
  imports: [PrismaModule],
})
export class GuildModule {}
