import { IsString, IsOptional, Length } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}