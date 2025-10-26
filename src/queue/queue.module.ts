import { Module } from '@nestjs/common';
import { Queue } from 'bullmq';
import { TRANSCODE_QUEUE } from './queue.constants';
import { createQueueConfig } from '../config/queue.config';
import { TranscodeQueueService } from './transcode-queue.service';
import { TranscodeWorker } from './transcode.worker';

const queueProvider = {
  provide: TRANSCODE_QUEUE,
  useFactory: () => {
    const config = createQueueConfig();
    return new Queue(TRANSCODE_QUEUE, { connection: config.connection });
  }
};

@Module({
  providers: [queueProvider, TranscodeQueueService, TranscodeWorker],
  exports: [TranscodeQueueService]
})
export class QueueModule {}
