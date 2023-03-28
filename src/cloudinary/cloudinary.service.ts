import { Injectable, BadRequestException } from '@nestjs/common';
import { CloudinaryUtilService } from './utils/cloudinaryUtil.service';

@Injectable()
export class CloudinaryService {
  constructor(private _cloudinary: CloudinaryUtilService) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this._cloudinary.uploadImage(file).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }

  async uploadImagesToCloudinary(files: Array<Express.Multer.File>) {
    return await this._cloudinary.uploadImages(files).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }

  async deleteImagesInCloudinary(publicId: string) {
    return await this._cloudinary.delete(publicId).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }

  async updateImagesInCloudinary(publicId: string, file: Express.Multer.File) {
    return await this._cloudinary.updateImg(publicId, file).catch((err) => {
      throw new BadRequestException('Update ', err.message);
    });
  }
}
