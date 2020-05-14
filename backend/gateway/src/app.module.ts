import { Module } from '@nestjs/common';
import { PostsController } from './posts/post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AttachmentsController } from './attachments/attachments.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POSTS',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888,
        },
      },
      {
        name: 'POST_TEMPLATE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8889,
        },
      },
      {
        name: 'ATTACHMENTS',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8890,
        },
      },
    ]),
  ],
  controllers: [PostsController, AttachmentsController],
  providers: [],
})
export class AppModule {}
