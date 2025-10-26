import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { VideoType } from './entities/video.entity';

@Resolver(() => VideoType)
export class VideosResolver {
  constructor(private readonly videosService: VideosService) {}

  @Query(() => [VideoType], { name: 'videos' })
  async getVideos(@Args('search', { type: () => String, nullable: true }) search?: string) {
    const results = await this.videosService.list({ search });
    return results.map((video) => ({
      ...video,
      tags: video.tags.map(({ tag }) => ({ id: tag.id, name: tag.name }))
    }));
  }

  @Query(() => VideoType, { name: 'video' })
  async getVideo(@Args('id', { type: () => ID }) id: string) {
    const video = await this.videosService.details(id);
    return {
      ...video,
      tags: video.tags.map(({ tag }) => ({ id: tag.id, name: tag.name }))
    };
  }
}
