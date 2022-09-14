import { Inject, Injectable } from '@nestjs/common';
import { Services } from '../utils/constants';
import { IImageStorageService } from './image-storage';
import { S3 } from '@aws-sdk/client-s3';
import {
  UploadImageParams,
  UploadMessageAttachmentParams,
} from '../utils/types';

@Injectable()
export class ImageStorageService implements IImageStorageService {
  constructor(
    @Inject(Services.SPACES_CLIENT)
    private readonly spacesClient: S3,
  ) {}

  upload(params: UploadImageParams) {
    return this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: params.key,
      Body: params.file.buffer,
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
  }

  async uploadMessageAttachment(params: UploadMessageAttachmentParams) {
    await this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: params.messageAttachment.key,
      Body: params.file.buffer,
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    });
    return params.messageAttachment;
  }
}
