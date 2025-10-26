import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VideoTagType {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;
}

@ObjectType()
export class VideoType {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  status!: string;

  @Field()
  sourceUrl!: string;

  @Field({ nullable: true })
  transcodedUrl?: string;

  @Field({ nullable: true })
  thumbnailUrl?: string;

  @Field({ nullable: true })
  duration?: number;

  @Field({ nullable: true })
  publishedAt?: Date;

  @Field(() => [VideoTagType])
  tags!: VideoTagType[];
}
