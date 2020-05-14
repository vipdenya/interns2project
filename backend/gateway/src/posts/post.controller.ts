import { PostTemplateDTO } from '../post-template/dto/post-template.dto';
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
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';
import { IPost } from './interfaces/post.interface';
import { IPostTemplate } from '../post-template/interfaces/post-template.interface';

@Controller()
export class PostsController {
  constructor(
    @Inject('POSTS') private readonly clientPostsService: ClientProxy,
    @Inject('POST_TEMPLATE')
    private readonly clientPostTemplateService: ClientProxy,
  ) {}

  @Get('/posts')
  async getPosts(@Req() req) {
    console.log(req.query);
    const postsResponse: IPost = await this.clientPostsService
      .send('get_all_posts', req.query)
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
    const tmpResponse: IPostTemplate = await this.clientPostTemplateService
      .send('add_post_template', createPostDTO.templateId)
      .toPromise();
    const postsResponse: IPost = await this.clientPostsService
      .send('add_post', { ...createPostDTO, templateId: tmpResponse })
      .toPromise();
    return postsResponse;
  }

  @Put('/edit')
  async editPost(
    @Query('postID', new ValidateObjectId()) postID: string,
    @Query('postTemplateID', new ValidateObjectId()) postTemplateID: string,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    let params;

    params = {
      postTemplateID,
      postTemplateDTO: createPostDTO.templateId,
    };
    const tmpResponse: IPostTemplate = await this.clientPostTemplateService
      .send('edit_post_template', params)
      .toPromise();

    params = {
      postID,
      createPostDTO: { ...createPostDTO, templateId: tmpResponse },
    };
    const postsResponse: IPost = await this.clientPostsService
      .send('edit_post', params)
      .toPromise();

    return postsResponse;
  }

  @Delete('/delete')
  async deletePost(@Query('postID', new ValidateObjectId()) postID: string) {
    const postsResponse = await this.clientPostsService
      .send('delete_post', postID)
      .toPromise();

    const tmpResponse = await this.clientPostTemplateService
      .send('delete_post_template', postsResponse)
      .toPromise();
    return tmpResponse;
  }
}
