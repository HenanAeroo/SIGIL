import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { GuildModule } from './guild/guild.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GuildModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
