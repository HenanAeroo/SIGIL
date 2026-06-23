import { Controller, Get } from '@nestjs/common';
import { GuildService } from './guild.service';

@Controller('guilds')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Get()
  findAll() {
    return this.guildService.findAll();
  }
}
