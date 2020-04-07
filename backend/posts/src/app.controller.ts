import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { BlogService } from './app.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BlogController {
  constructor(private blogService: BlogService) {}

  @MessagePattern('get_all_posts')
  async getPosts() {
    const posts = await this.blogService.getPosts();
    if (!posts) throw new NotFoundException('Posts does not exist!');
    return posts;
  }

  @MessagePattern('get_post')
  async getPost(postID) {
    const post = await this.blogService.getPost(postID);
    if (!post) throw new NotFoundException('Post does not exist!');
    return post;
  }

  @MessagePattern('add_post')
  async addPost(createPostDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(createPostDTO);
    return newPost;
  }

  @MessagePattern('edit_post')
  async editPost(params: { postID; createPostDTO: CreatePostDTO }) {
    const editedPost = await this.blogService.editPost(
      params.postID,
      params.createPostDTO,
    );
    if (!editedPost) throw new NotFoundException('Post does not exist!');
    return editedPost;
  }

  @MessagePattern('delete_post')
  async deletePost(postID) {
    const deletedPost = await this.blogService.deletePost(postID);
    if (!deletedPost) throw new NotFoundException('Post does not exist!');
    return deletedPost;
  }

  // @Get('posts')
  // async getPosts(@Res() res) {
  //   const posts = await this.blogService.getPosts();
  //   return res.status(HttpStatus.OK).json(posts);
  // }

  // @Get('post/:postID')
  // async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
  //   const post = await this.blogService.getPost(postID);
  //   if (!post) throw new NotFoundException('Post does not exist!');
  //   return res.status(HttpStatus.OK).json(post);
  // }

  // @Post('/post')
  // async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
  //   const newPost = await this.blogService.addPost(createPostDTO);
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Post has been submitted successfully!',
  //     post: newPost,
  //   });
  // }

  // @Put('/edit')
  // async editPost(
  //   @Res() res,
  //   @Query('postID', new ValidateObjectId()) postID,
  //   @Body() createPostDTO: CreatePostDTO,
  // ) {
  //   const editedPost = await this.blogService.editPost(postID, createPostDTO);
  //   if (!editedPost) throw new NotFoundException('Post does not exist!');
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Post has been successfully updated',
  //     post: editedPost,
  //   });
  // }

  // @Delete('/delete')
  // async deletePost(
  //   @Res() res,
  //   @Query('postID', new ValidateObjectId()) postID,
  // ) {
  //   const deletedPost = await this.blogService.deletePost(postID);
  //   if (!deletedPost) throw new NotFoundException('Post does not exist!');
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Post has been deleted!',
  //     post: deletedPost,
  //   });
  //
}
