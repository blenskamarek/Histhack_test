import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ResolveReportDto } from './dto/resolve-report.dto';

@Controller('moderation')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Post('reports')
  createReport(@Body() input: CreateReportDto) {
    return this.moderationService.createReport(input);
  }

  @Get('reports/pending')
  pendingReports() {
    return this.moderationService.listPendingReports();
  }

  @Post('reports/:id/resolve')
  resolveReport(@Param('id') id: string, @Body() input: ResolveReportDto) {
    return this.moderationService.resolveReport(id, input);
  }
}
