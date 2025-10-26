import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { StorageService } from '../common/services/storage.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { TranscodeQueueService } from '../queue/transcode-queue.service';
import { ModerationService } from '../moderation/moderation.service';
import { VideoStatus } from '@prisma/client';

@Injectable()
export class UploadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    private readonly queue: TranscodeQueueService,
    private readonly moderation: ModerationService
  ) {}

  async createUpload(input: CreateUploadDto) {
    const video = await this.prisma.video.create({
      data: {
        title: input.title,
        description: input.description,
        authorId: input.userId,
        status: VideoStatus.PENDING,
        sourceUrl: '',
        tags: input.tags?.length
          ? {
              create: input.tags.map((tag) => ({
                tag: {
                  connectOrCreate: {
                    where: { name: tag },
                    create: { name: tag }
                  }
                }
              }))
            }
          : undefined
      }
    });

    const key = this.storage.createVideoUploadKey(video.id);
    const uploadUrl = await this.storage.createPresignedUpload(key);
    const publicSourceUrl = this.storage.publicUrl(key);

    await this.prisma.video.update({
      where: { id: video.id },
      data: { sourceUrl: publicSourceUrl }
    });

    await this.queue.enqueue(video.id, publicSourceUrl);
    await this.moderation.autoEvaluateVideo(video.id, {
      title: video.title,
      description: video.description
    });

    return {
      videoId: video.id,
      uploadUrl,
      sourceUrl: publicSourceUrl
    };
  }
}
