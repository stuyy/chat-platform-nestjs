import { Module } from '@nestjs/common';
import { Services } from '../utils/constants';
import { S3 } from '@aws-sdk/client-s3';
import { ImageStorageService } from './image-storage.service';

@Module({
  providers: [
    {
      provide: Services.SPACES_CLIENT,
      useValue: new S3({
        credentials: {
          accessKeyId: process.env.SPACES_KEY,
          secretAccessKey: process.env.SPACES_SECRET_KEY,
        },
        endpoint: 'https://ams3.digitaloceanspaces.com',
        region: 'ams3',
      }),
    },
    {
      provide: Services.IMAGE_UPLOAD_SERVICE,
      useClass: ImageStorageService,
    },
  ],
  exports: [
    {
      provide: Services.SPACES_CLIENT,
      useValue: new S3({
        credentials: {
          accessKeyId: process.env.SPACES_KEY,
          secretAccessKey: process.env.SPACES_SECRET_KEY,
        },
        endpoint: 'https://ams3.digitaloceanspaces.com',
        region: 'ams3',
      }),
    },
    {
      provide: Services.IMAGE_UPLOAD_SERVICE,
      useClass: ImageStorageService,
    },
  ],
})
export class ImageStorageModule {}
