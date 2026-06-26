import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGuildDto {
  @ApiProperty({
    description: "Correspond à l'ID du serveur discord",
    example: 'a1b2c3d4e5',
  })
  @IsString()
  @IsNotEmpty()
  discordId!: string;

  @ApiProperty({
    description: 'Correspond au nom du serveur discord',
    example: 'Dehaimper',
  })
  @IsString()
  @IsNotEmpty()
  serverName!: string;
}
