import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ResolveReportDto } from './dto/resolve-report.dto';
import { ReportStatus, UserRole, VideoStatus } from '@prisma/client';

const FLAGGED_KEYWORDS = ['spam', 'violence', 'abuse'];

@Injectable()
export class ModerationService {
  constructor(private readonly prisma: PrismaService) {}

  async autoEvaluateVideo(videoId: string, payload: { title: string; description: string }) {
    const content = `${payload.title} ${payload.description}`.toLowerCase();
    const flagged = FLAGGED_KEYWORDS.some((keyword) => content.includes(keyword));

    if (flagged) {
      await this.prisma.video.update({
        where: { id: videoId },
        data: { status: VideoStatus.REJECTED }
      });

      await this.prisma.report.create({
        data: {
          reason: 'Automatyczne wykrycie nieodpowiedniej treści',
          reporterId: (await this.ensureSystemModerator()).id,
          videoId,
          status: ReportStatus.PENDING
        }
      });
    }
  }

  async createReport(input: CreateReportDto) {
    return this.prisma.report.create({
      data: {
        reason: input.reason,
        reporterId: input.reporterId,
        videoId: input.videoId
      }
    });
  }

  listPendingReports() {
    return this.prisma.report.findMany({
      where: { status: ReportStatus.PENDING },
      include: {
        video: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true
          }
        },
        reporter: {
          select: { id: true, displayName: true }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async resolveReport(id: string, input: ResolveReportDto) {
    const report = await this.prisma.report.findUnique({ where: { id } });
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const status = input.approve ? ReportStatus.APPROVED : ReportStatus.REJECTED;

    await this.prisma.report.update({
      where: { id },
      data: {
        status,
        moderatorId: input.moderatorId,
        verdict: input.verdict
      }
    });

    if (input.approve) {
      await this.prisma.video.update({
        where: { id: report.videoId },
        data: { status: VideoStatus.REJECTED }
      });
    } else {
      await this.prisma.video.update({
        where: { id: report.videoId },
        data: { status: VideoStatus.READY }
      });
    }
  }

  private async ensureSystemModerator() {
    const email = 'system@histhack.local';
    let moderator = await this.prisma.user.findUnique({ where: { email } });
    if (!moderator) {
      moderator = await this.prisma.user.create({
        data: {
          email,
          passwordHash: '',
          displayName: 'System Moderator',
          role: UserRole.MODERATOR
        }
      });
    }
    return moderator;
  }
}
