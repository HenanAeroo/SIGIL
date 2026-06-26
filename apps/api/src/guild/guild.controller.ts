import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { GuildService } from './guild.service';
import { CreateGuildDto } from './dto/create-guild.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('guilds')
@Controller('guilds')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @ApiOperation({ summary: 'Créer un serveur discord' })
  @ApiResponse({
    status: 201,
    description: 'Création réussie et validée côté serveur',
  })
  @ApiResponse({
    status: 400,
    description: 'Body invalide ou champs manquants',
  })
  @Post()
  create(@Body() dto: CreateGuildDto) {
    return this.guildService.create(dto);
  }

  @ApiOperation({ summary: 'Trouve tous les serveurs discord liés au bot' })
  @ApiResponse({ status: 200, description: 'Les serveurs ont été trouvés' })
  @Get()
  findAll() {
    return this.guildService.findAll();
  }

  @ApiOperation({ summary: 'Retrouve un serveur discord par son ID' })
  @ApiResponse({ status: 200, description: 'Serveur discord bien retrouvé' })
  @ApiResponse({ status: 400, description: 'UUID invalide' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return { id };
  }
}
