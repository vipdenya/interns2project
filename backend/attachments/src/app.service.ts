import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IAttachments } from './interfaces/attachments.interface';
import { AttachmentsDTO } from './dto/attachments.dto';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectModel('Attachments')
    private readonly attachmentsModel: Model<IAttachments>,
  ) {}

  async addFile(attachmentsDTO: AttachmentsDTO): Promise<IAttachments> {
    const newAttachments = await new this.attachmentsModel(attachmentsDTO);
    return newAttachments.save();
  }

  async deleteFile(attachmentID: string): Promise<any> {
    const deletedPost = await this.attachmentsModel.findByIdAndRemove(
      attachmentID,
    );
    return deletedPost.get('fileID');
  }
}
