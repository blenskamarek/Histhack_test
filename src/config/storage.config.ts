export interface S3Config {
  accessKeyId: string;
  secretAccessKey: string;
  endpoint?: string;
  region: string;
  bucket: string;
}

export const createS3Config = (): S3Config => ({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local-key',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local-secret',
  endpoint: process.env.AWS_S3_ENDPOINT,
  region: process.env.AWS_REGION || 'eu-central-1',
  bucket: process.env.AWS_S3_BUCKET || 'histhack-dev'
});
