import { Document } from 'mongoose';

export interface IPost extends Document {
  readonly title: string;
  readonly body: string;
  readonly templateId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
