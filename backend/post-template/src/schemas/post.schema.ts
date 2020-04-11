import * as mongoose from 'mongoose';

export const PostTemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});
