import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  reporterId!: string;

  @IsString()
  @IsNotEmpty()
  videoId!: string;

  @IsString()
  @IsNotEmpty()
  reason!: string;
}
