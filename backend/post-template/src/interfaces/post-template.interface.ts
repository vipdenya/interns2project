import { Document } from 'mongoose';

export interface IPostTemplate extends Document {
  readonly title: string;
  readonly body: string;
}
