import { MessageAttachment } from '../utils/typeorm';
import {
  UploadImageParams,
  UploadMessageAttachmentParams,
} from '../utils/types';

export interface IImageStorageService {
  upload(params: UploadImageParams);
  uploadMessageAttachment(
    params: UploadMessageAttachmentParams,
  ): Promise<MessageAttachment>;
}
