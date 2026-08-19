import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateGuildDto {
  @ApiProperty({
    description: "Correspond à l'ID du serveur discord",
    example: '123456789012345678',
  })
  @IsString()
  @Matches(/^\d{17,19}$/)
  discordId!: string;

  @ApiProperty({
    description: 'Correspond au nom du serveur discord',
    example: 'Dehaimper',
  })
  @IsString()
  @IsNotEmpty()
  serverName!: string;
}
