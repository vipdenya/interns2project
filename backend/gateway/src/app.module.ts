import { Module } from '@nestjs/common';
import { PostsController } from './post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ]),
  ],
  controllers: [PostsController],
  providers: [],
})
export class AppModule {}
