import { Controller, NotFoundException } from '@nestjs/common';
import { PostTemplateService } from './app.service';
import { PostTemplateDTO } from './dto/post-template.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PostTemplateController {
  constructor(private postTemplateService: PostTemplateService) {}

  @MessagePattern('get_all_posts')
  async getPosts() {
    const posts = await this.postTemplateService.getPosts();
    if (!posts) throw new NotFoundException('Posts does not exist!');
    return posts;
  }

  @MessagePattern('get_post')
  async getPost(postID) {
    const post = await this.postTemplateService.getPost(postID);
    if (!post) throw new NotFoundException('Post does not exist!');
    return post;
  }

  @MessagePattern('add_post_template')
  async addPost(postTemplateDTO: PostTemplateDTO) {
    const newPost = await this.postTemplateService.addPost(postTemplateDTO);
    return newPost;
  }

  @MessagePattern('edit_post_template')
  async editPost(params: {
    postTemplateID: string;
    postTemplateDTO: PostTemplateDTO;
  }) {
    const editedPost = await this.postTemplateService.editPost(
      params.postTemplateID,
      params.postTemplateDTO,
    );
    if (!editedPost) throw new NotFoundException('Post does not exist!');
    return editedPost;
  }

  @MessagePattern('delete_post_template')
  async deletePost(postID) {
    const deletedPost = await this.postTemplateService.deletePost(postID);
    if (!deletedPost) throw new NotFoundException('Post does not exist!');
    return deletedPost;
  }
}
