import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { GuildModule } from './guild/guild.module.js';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GuildModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
