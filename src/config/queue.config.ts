export interface QueueConfig {
  connection: {
    host: string;
    port: number;
    password?: string;
  };
}

export const createQueueConfig = (): QueueConfig => ({
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD
  }
});
