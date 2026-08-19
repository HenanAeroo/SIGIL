import { Injectable } from '@nestjs/common';
import { CreateGuildDto } from './dto/create-guild.dto';

@Injectable()
export class GuildService {
  create(dto: CreateGuildDto) {
    return dto;
  }

  findAll() {
    return [];
  }

  findOne(id: string) {
    return { id };
  }
}
