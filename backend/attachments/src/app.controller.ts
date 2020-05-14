import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Param,
  Res,
  Delete,
  Query,
} from '@nestjs/common';
import { AttachmentsService } from './app.service';
import { diskStorage, memoryStorage } from 'multer';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from './file-upload.utils';
import { cloudinary } from './cloudinaryConfig';
import path = require('path');
import { MessagePattern } from '@nestjs/microservices';
import { IAttachments } from './interfaces/attachments.interface';
import { AttachmentsDTO } from './dto/attachments.dto';

@Controller()
export class AppController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  @MessagePattern('upload_files')
  async uploadFiles(files) {
    let resCloudinary = files.map(async file => {
      const base64 = Buffer.from(file.buffer).toString('base64');
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${base64}`,
      );
      return result;
    });
    let res: any = await Promise.all(resCloudinary);
    let resAttachments = [];
    res.forEach(element => {
      let attachment: AttachmentsDTO = {
        fileID: element.public_id,
        link: element.url,
        createdAt: element.created_at,
        contentType: element.resource_type,
      };
      this.attachmentsService.addFile(attachment);
      resAttachments.push(attachment);
    });
    return resAttachments;
  }

  @MessagePattern('delete_file')
  async deleteFile(attachmentID) {
    const publicID = await this.attachmentsService.deleteFile(attachmentID);
    const result = await cloudinary.uploader.destroy(publicID, function(
      error,
      result,
    ) {
      console.log(result, error);
    });
    return await result;
  }
}
