import { Document } from 'mongoose';
import { IPostTemplate } from './post-template.interface';

export interface IPost extends Document {
  readonly title: string;
  readonly body: string;
  readonly templateId: IPostTemplate;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
