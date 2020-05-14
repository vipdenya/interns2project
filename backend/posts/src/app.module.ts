import { Module } from '@nestjs/common';
import { PostController } from './app.controller';
import { PostService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, PostTemplateSchema } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    MongooseModule.forFeature([
      { name: 'PostTemplate', schema: PostTemplateSchema },
    ]),
    MongooseModule.forRoot('mongodb://localhost/intern2project', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class AppModule {}
