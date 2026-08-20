import { Module } from '@nestjs/common';
import { GuildController } from './guild.controller.js';
import { GuildService } from './guild.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  controllers: [GuildController],
  providers: [GuildService],
  imports: [PrismaModule, AuthModule],
})
export class GuildModule {}
