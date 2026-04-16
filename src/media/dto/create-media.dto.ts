import { IsString, IsInt, Min } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  title: string;

  @IsInt()
  @Min(1)
  durationSeconds: number;

  @IsString()
  url: string;
}