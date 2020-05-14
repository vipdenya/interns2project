import {
  Controller,
  Get,
  Post,
  Inject,
  Body,
  Param,
  Query,
  Put,
  Delete,
  Req,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { memoryStorage } from 'multer';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from './file-upload.utils';

@Controller('attachments')
export class AttachmentsController {
  constructor(
    @Inject('ATTACHMENTS')
    private readonly clientAttachmentsService: ClientProxy,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = await this.clientAttachmentsService
      .send('upload_files', files)
      .toPromise();

    return response;
  }

  @Delete('delete')
  async deleteFile(@Query('attachmentID') attachmentID) {
    const response = await this.clientAttachmentsService
      .send('delete_file', attachmentID)
      .toPromise();

    return response;
  }
}
