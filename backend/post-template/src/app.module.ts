import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostTemplateController } from './app.controller';
import { PostTemplateService } from './app.service';
import { PostTemplateSchema } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PostTemplate', schema: PostTemplateSchema },
    ]),
    MongooseModule.forRoot('mongodb://localhost/intern2project', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [PostTemplateController],
  providers: [PostTemplateService],
})
export class AppModule {}
