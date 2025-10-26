import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Worker } from 'bullmq';
import { TRANSCODE_QUEUE } from './queue.constants';
import { createQueueConfig } from '../config/queue.config';
import { TranscodeQueueService } from './transcode-queue.service';

@Injectable()
export class TranscodeWorker implements OnModuleDestroy {
  private readonly logger = new Logger(TranscodeWorker.name);
  private readonly worker: Worker;

  constructor(private readonly queueService: TranscodeQueueService) {
    const config = createQueueConfig();
    this.worker = new Worker(
      TRANSCODE_QUEUE,
      async (job) => {
        this.logger.log(`Processing job ${job.id} for video ${job.data.videoId}`);
        await this.queueService.markProcessing(job.data.videoId);

        // Simulate FFmpeg processing and thumbnail generation.
        await new Promise((resolve) => setTimeout(resolve, 100));

        const transcodedUrl = `https://cdn.example.com/videos/${job.data.videoId}/master.m3u8`;
        const thumbnailUrl = `https://cdn.example.com/videos/${job.data.videoId}/thumb.jpg`;
        await this.queueService.markReady(job.data.videoId, transcodedUrl, thumbnailUrl);
        return { transcodedUrl, thumbnailUrl };
      },
      {
        connection: config.connection
      }
    );

    this.worker.on('completed', (job) => {
      this.logger.log(`Job ${job.id} completed.`);
    });

    this.worker.on('failed', (job, err) => {
      this.logger.error(`Job ${job?.id} failed: ${err.message}`);
    });
  }

  async onModuleDestroy() {
    await this.worker.close();
  }
}
