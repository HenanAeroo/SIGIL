import { Body, Controller, Get, Post } from '@nestjs/common';
import { GuildService } from './guild.service';
import { CreateGuildDto } from './dto/create-guild.dto';

@Controller('guilds')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Post()
  create(@Body() dto: CreateGuildDto) {
    return this.guildService.create(dto);
  }

  @Get()
  findAll() {
    return this.guildService.findAll();
  }
}
