import { UploadImageParams } from '../utils/types';

export interface IImageStorage {
  uploadBanner(params: UploadImageParams);
  uploadProfilePicture();

  deleteBanner();
  deleteProfilePicture();
}
