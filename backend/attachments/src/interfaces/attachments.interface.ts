import { Document } from 'mongoose';

export interface IAttachments extends Document {
  readonly fileID: string;
  readonly link: string;
  readonly createdAt: Date;
  readonly contentType: string;
}
