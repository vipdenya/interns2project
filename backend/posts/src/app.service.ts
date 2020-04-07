import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPost } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<IPost>) {}

  async getPosts(): Promise<IPost[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async getPost(postID: string): Promise<IPost> {
    const post = await this.postModel.findById(postID).exec();
    return post;
  }

  async addPost(createPostDTO: CreatePostDTO): Promise<IPost> {
    const newPost = await new this.postModel(createPostDTO);
    return newPost.save();
  }

  async editPost(postID: string, createPostDTO: CreatePostDTO): Promise<IPost> {
    const editedPost = await this.postModel.findByIdAndUpdate(
      postID,
      createPostDTO,
      { new: true },
    );
    return editedPost;
  }

  async deletePost(postID: string): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndRemove(postID);
    return deletedPost;
  }
}
