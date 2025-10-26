import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { VideosResolver } from './videos.resolver';

@Module({
  controllers: [VideosController],
  providers: [VideosService, VideosResolver],
  exports: [VideosService]
})
export class VideosModule {}
