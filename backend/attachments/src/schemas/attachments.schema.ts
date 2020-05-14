import * as mongoose from 'mongoose';

export const AttachmentsSchema = new mongoose.Schema({
  fileID: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, required: true },
  contentType: { type: String, required: true },
});
