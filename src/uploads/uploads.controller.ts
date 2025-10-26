import { Body, Controller, Post } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { CreateUploadDto } from './dto/create-upload.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('video')
  createUpload(@Body() input: CreateUploadDto) {
    return this.uploadsService.createUpload(input);
  }
}
