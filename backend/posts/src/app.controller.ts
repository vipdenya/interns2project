import { Controller, NotFoundException } from '@nestjs/common';
import { PostService } from './app.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PostController {
  constructor(private blogService: PostService) {}

  @MessagePattern('get_all_posts')
  async getPosts(req) {
    console.log(req);
    const posts = await this.blogService.getPosts(req);
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
  async editPost(params) {
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
}
