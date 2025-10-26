import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { QueueModule } from '../queue/queue.module';
import { ModerationModule } from '../moderation/moderation.module';

@Module({
  imports: [QueueModule, ModerationModule],
  controllers: [UploadsController],
  providers: [UploadsService]
})
export class UploadsModule {}
