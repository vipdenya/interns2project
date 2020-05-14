import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AttachmentsService } from './app.service';
import { AttachmentsSchema } from './schemas/attachments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Attachments', schema: AttachmentsSchema },
    ]),
    MongooseModule.forRoot('mongodb://localhost/intern2project', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AttachmentsService],
})
export class AppModule {}
