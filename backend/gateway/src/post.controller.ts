import {
  Controller,
  Get,
  Post,
  Inject,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePostDTO } from './posts/dto/create-post.dto';
import { ValidateObjectId } from './posts/shared/validate-object-id.pipes';
import { IPost } from './posts/interfaces/post.interface';

@Controller()
export class PostsController {
  constructor(
    @Inject('POSTS') private readonly clientPostsService: ClientProxy,
  ) {}

  @Get('/posts')
  async getPosts() {
    const postsResponse: IPost = await this.clientPostsService
      .send('get_all_posts', {})
      .toPromise();
    return postsResponse;
  }

  @Get('post/:postID')
  async getPost(@Param('postID', new ValidateObjectId()) postID: string) {
    const postsResponse: IPost = await this.clientPostsService
      .send('get_post', postID)
      .toPromise();
    return postsResponse;
  }

  @Post('/post')
  async addPost(@Body() createPostDTO: CreatePostDTO) {
    const postsResponse: IPost = await this.clientPostsService
      .send('add_post', createPostDTO)
      .toPromise();
    return postsResponse;
  }

  @Put('/edit')
  async editPost(
    @Query('postID', new ValidateObjectId()) postID: string,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    let params: object = { postID, createPostDTO };
    const postsResponse: IPost = await this.clientPostsService
      .send('edit_post', params)
      .toPromise();
    return postsResponse;
  }

  @Delete('/delete')
  async deletePost(@Query('postID', new ValidateObjectId()) postID: string) {
    const postsResponse: IPost = await this.clientPostsService
      .send('delete_post', postID)
      .toPromise();
    return postsResponse;
  }
}
