import { IPostTemplate } from 'src/post-template/interfaces/post-template.interface';

export interface IPost {
  title: string;
  body: string;
  templateId: IPostTemplate;
  createdAt: Date;
  updatedAt: Date;
}
