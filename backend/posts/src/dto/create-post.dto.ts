import { IPostTemplate } from 'src/interfaces/post-template.interface';

export class CreatePostDTO {
  title: string;
  body: string;
  templateId: IPostTemplate;
  createdAt: Date;
  updatedAt: Date;
}
