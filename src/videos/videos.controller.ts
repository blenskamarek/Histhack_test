import { Controller, Get, Param, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { FilterVideosDto } from './dto/filter-videos.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  list(@Query() filter: FilterVideosDto) {
    return this.videosService.list(filter);
  }

  @Get(':id')
  details(@Param('id') id: string) {
    return this.videosService.details(id);
  }
}
