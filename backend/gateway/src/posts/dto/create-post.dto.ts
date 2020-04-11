import { IPostTemplate } from 'src/post-template/interfaces/post-template.interface';
import { PostTemplateDTO } from 'src/post-template/dto/post-template.dto';

export class CreatePostDTO {
  title: string;
  body: string;
  templateId: PostTemplateDTO;
  createdAt: Date;
  updatedAt: Date;
}
