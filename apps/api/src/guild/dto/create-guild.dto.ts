import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGuildDto {
  @IsString()
  @IsNotEmpty()
  discordId!: string;

  @IsString()
  @IsNotEmpty()
  serverName!: string;
}
