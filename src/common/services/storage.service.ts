import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { createS3Config } from '../../config/storage.config';

@Injectable()
export class StorageService {
  private readonly s3: S3;
  private readonly bucket: string;

  constructor() {
    const config = createS3Config();
    this.bucket = config.bucket;
    this.s3 = new S3({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      endpoint: config.endpoint,
      region: config.region,
      s3ForcePathStyle: Boolean(config.endpoint)
    });
  }

  createVideoUploadKey(videoId: string) {
    return `uploads/${videoId}/source.mp4`;
  }

  async createPresignedUpload(key: string, expiresInSeconds = 3600) {
    return this.s3.getSignedUrlPromise('putObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: expiresInSeconds,
      ContentType: 'video/mp4'
    });
  }

  publicUrl(key: string) {
    if (process.env.AWS_S3_PUBLIC_URL_BASE) {
      return `${process.env.AWS_S3_PUBLIC_URL_BASE}/${key}`;
    }
    return `https://${this.bucket}.s3.${process.env.AWS_REGION || 'eu-central-1'}.amazonaws.com/${key}`;
  }
}
