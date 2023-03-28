import { THttpResponse } from './../../shared/common/http-response.dto';
import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import {
  DeleteApiResponse,
  UploadApiErrorResponse,
  UploadApiResponse,
  v2,
} from 'cloudinary';
import toStream = require('buffer-to-stream');
import { ICloudinaryData } from '../../shared/interfaces/cloudinary.interface';
@Injectable()
export class CloudinaryUtilService {
  async uploadImages(
    files: Array<Express.Multer.File>,
  ): Promise<THttpResponse<ICloudinaryData[]>> {
    try {
      const result = await Promise.all(files.map((f) => this.upload(f)));

      return {
        statusCode: HttpStatus.CREATED,
        data: result.map((i) => {
          return {
            publicId: i.public_id,
            photoUrl: i.url,
          };
        }),
      };
    } catch (err) {
      throw new BadRequestException('Upload failed');
    }
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<THttpResponse<ICloudinaryData>> {
    try {
      const result = await this.upload(file);

      return {
        statusCode: HttpStatus.CREATED,
        data: {
          publicId: result.public_id,
          photoUrl: result.url,
        },
      };
    } catch (err) {
      throw new BadRequestException('Upload failed');
    }
  }

  async updateImg(publicId: string, file: Express.Multer.File) {
    try {
      const deleteRes = await this.delete(publicId);

      const res = await this.upload(file[0]);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Update failed');
    }
  }

  upload(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  delete(public_id: string): Promise<DeleteApiResponse> {
    return new Promise((resolve, reject) => {
      const result = v2.uploader.destroy(
        public_id,
        {
          resource_type: 'image',
        },
        (error) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      );
    });
  }
}
