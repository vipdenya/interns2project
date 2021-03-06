import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPost } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<IPost>) {}

  async getPosts(options): Promise<IPost[]> {
    const posts = await this.postModel
      .find()
      .skip(Number(options.skip))
      .limit(Number(options.limit))
      .populate('templateId')
      .exec();
    return posts;
  }

  async getPost(postID: string): Promise<IPost> {
    const post = await this.postModel
      .findById(postID)
      .populate('templateId')
      .exec();
    return post;
  }

  async addPost(createPostDTO: CreatePostDTO): Promise<IPost> {
    const newPost = await new this.postModel(createPostDTO);
    newPost.save();
    let post = await newPost.populate('templateId').execPopulate();
    return post;
  }

  async editPost(postID: string, createPostDTO: CreatePostDTO): Promise<IPost> {
    console.log(postID, createPostDTO);
    const editedPost = await this.postModel
      .findByIdAndUpdate(postID, createPostDTO, { new: true })
      .populate('templateId');
    return editedPost;
  }

  async deletePost(postID: string): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndRemove(postID);
    console.log(deletedPost.get('templateId'));
    return deletedPost.get('templateId');
  }
}
