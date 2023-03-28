import { CloudinaryProvider } from './cloudinary.provider';
import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryUtilService } from './utils/cloudinaryUtil.service';

@Module({
  providers: [CloudinaryService, CloudinaryUtilService, CloudinaryProvider],
  exports: [CloudinaryService, CloudinaryUtilService],
})
export class CloudinaryModule {}
