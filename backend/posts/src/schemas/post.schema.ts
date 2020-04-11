import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostTemplate',
  },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export const PostTemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});
