import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResolveReportDto {
  @IsString()
  @IsNotEmpty()
  moderatorId!: string;

  @IsBoolean()
  approve!: boolean;

  @IsOptional()
  @IsString()
  verdict?: string;
}
