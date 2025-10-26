import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';
import { TRANSCODE_QUEUE } from './queue.constants';
import { PrismaService } from '../common/services/prisma.service';
import { VideoStatus } from '@prisma/client';

@Injectable()
export class TranscodeQueueService implements OnModuleDestroy {
  constructor(
    @Inject(TRANSCODE_QUEUE) private readonly queue: Queue,
    private readonly prisma: PrismaService
  ) {}

  enqueue(videoId: string, sourceUrl: string) {
    return this.queue.add('transcode', { videoId, sourceUrl });
  }

  async onModuleDestroy() {
    await this.queue.close();
  }

  async markProcessing(videoId: string) {
    await this.prisma.video.update({
      where: { id: videoId },
      data: { status: VideoStatus.PROCESSING }
    });
  }

  async markReady(videoId: string, transcodedUrl: string, thumbnailUrl: string) {
    const result = await this.prisma.video.updateMany({
      where: { id: videoId, status: { not: VideoStatus.REJECTED } },
      data: {
        status: VideoStatus.READY,
        transcodedUrl,
        thumbnailUrl,
        publishedAt: new Date()
      }
    });

    if (result.count === 0) {
      await this.prisma.video.update({
        where: { id: videoId },
        data: {
          transcodedUrl,
          thumbnailUrl
        }
      });
    }
  }
}
