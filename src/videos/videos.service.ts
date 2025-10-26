import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { FilterVideosDto } from './dto/filter-videos.dto';
import { VideoStatus } from '@prisma/client';

@Injectable()
export class VideosService {
  constructor(private readonly prisma: PrismaService) {}

  async list(filter: FilterVideosDto) {
    const { search, skip = 0, take = 20 } = filter;
    return this.prisma.video.findMany({
      where: {
        status: VideoStatus.READY,
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
              ]
            }
          : {})
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      },
      skip,
      take,
      orderBy: { publishedAt: 'desc' }
    });
  }

  async details(id: string) {
    const video = await this.prisma.video.findUnique({
      where: { id },
      include: {
        tags: {
          include: { tag: true }
        },
        author: {
          select: { id: true, displayName: true, avatarUrl: true }
        }
      }
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    return video;
  }
}
