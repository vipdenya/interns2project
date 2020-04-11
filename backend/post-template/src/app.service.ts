import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPostTemplate } from './interfaces/post-template.interface';
import { PostTemplateDTO } from './dto/post-template.dto';

@Injectable()
export class PostTemplateService {
  constructor(
    @InjectModel('PostTemplate')
    private readonly postModel: Model<IPostTemplate>,
  ) {}

  async getPosts(): Promise<IPostTemplate[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async getPost(postID: string): Promise<IPostTemplate> {
    const post = await this.postModel.findById(postID).exec();
    return post;
  }

  async addPost(postTemplateDTO: PostTemplateDTO): Promise<IPostTemplate> {
    const newPost = await new this.postModel(postTemplateDTO);
    return newPost.save();
  }

  async editPost(
    postTemplateID: string,
    postTemplateDTO: PostTemplateDTO,
  ): Promise<IPostTemplate> {
    console.log(postTemplateID, postTemplateDTO);
    const editedPost = await this.postModel.findByIdAndUpdate(
      postTemplateID,
      postTemplateDTO,
      { new: true },
    );
    return editedPost;
  }

  async deletePost(postID: string): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndRemove(postID);
    return deletedPost;
  }
}
