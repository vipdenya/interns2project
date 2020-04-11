import { Module } from '@nestjs/common';
import { BlogController } from './app.controller';
import { BlogService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema, PostTemplateSchema } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }]),
    MongooseModule.forFeature([
      { name: 'PostTemplate', schema: PostTemplateSchema },
    ]),
    MongooseModule.forRoot('mongodb://localhost/intern2project', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class AppModule {}
