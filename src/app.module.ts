import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
import { UploadsModule } from './uploads/uploads.module';
import { ModerationModule } from './moderation/moderation.module';
import { QueueModule } from './queue/queue.module';
import { PrismaModule } from './common/services/prisma.module';
import { StorageModule } from './common/services/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      context: ({ req }) => ({ req })
    }),
    PrismaModule,
    StorageModule,
    AuthModule,
    UsersModule,
    VideosModule,
    UploadsModule,
    ModerationModule,
    QueueModule
  ]
})
export class AppModule {}
