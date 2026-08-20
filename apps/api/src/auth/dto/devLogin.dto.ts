import { IsString } from 'class-validator';

export class DevLoginDto {
  @IsString()
  discordId!: string;
}
