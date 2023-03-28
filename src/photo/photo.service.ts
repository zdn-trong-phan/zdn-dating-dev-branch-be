import { THttpResponse } from './../shared/common/http-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import {
  Injectable,
  BadRequestException,
  HttpStatus,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { ICloudinaryData } from '../shared/interfaces/cloudinary.interface';
import { UserService } from 'src/user/user.service';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { SetAvatarDto } from './dto/set-avatar.dto';
import { ProfileService } from 'src/profile/profile.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PhotoDto } from './dto/photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly _photo: Repository<Photo>,
    private readonly _cloudinaryService: CloudinaryService,
    private readonly _userService: UserService,
    private readonly _profileService: ProfileService,
    @InjectMapper() private readonly _classMapper: Mapper,
  ) {}

  async getUserPhoto(userId: string): Promise<THttpResponse<PhotoDto[]>> {
    try {
      // const photos = await this._photo.find({
      //   where: { userId },
      //   order: {
      //     isFavorite: 'DESC',
      //     updatedAt: 'DESC',
      //   },
      // });

      const photos = await this._classMapper.mapArrayAsync(
        await this._photo.find({
          where: { userId },
          order: {
            isFavorite: 'DESC',
            updatedAt: 'DESC',
          },
        }),
        Photo,
        PhotoDto,
      );

      return {
        statusCode: HttpStatus.OK,
        data: photos,
      };
    } catch (err) {
      throw new BadRequestException(HttpStatus.NOT_FOUND, 'Photo not found!');
    }
  }

  async uploadImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
    userId: string,
  ): Promise<THttpResponse<void>> {
    try {
      const result = await this._cloudinaryService.uploadImagesToCloudinary(
        files,
      );

      await this.storeImages(userId, result.data);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Uploaded',
      };
    } catch (err) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        'Upload images failed',
      );
    }
  }

  async storeImages(userId: string, images: ICloudinaryData[]) {
    try {
      for (let i = 0; i < images.length; i++) {
        await this._photo.save({
          userId,
          photoUrl: images[i].photoUrl,
          publicId: images[i].publicId,
          isFavorite: false,
        });
      }
    } catch (err) {
      // store url failed => delete in cloudinary
      images.map(async (i) => {
        await this._cloudinaryService.deleteImagesInCloudinary(i.publicId);
      });

      throw new BadRequestException(
        HttpStatus.FAILED_DEPENDENCY,
        'Store photo failed',
      );
    }
  }

  async deleteImage(userId, publicId): Promise<THttpResponse<void>> {
    try {
      await this._photo.delete({
        userId,
        publicId,
      });

      await this._cloudinaryService.deleteImagesInCloudinary(publicId);

      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Deleted',
      };
    } catch (err) {
      throw new BadRequestException(HttpStatus.BAD_REQUEST, 'Delete Failed');
    }
  }

  async updateImage(
    @UploadedFile() file: Express.Multer.File,
    userId: string,
    publicId: string,
  ): Promise<THttpResponse<void>> {
    try {
      await this._photo.delete({ publicId });

      await this._cloudinaryService.updateImagesInCloudinary(publicId, file);

      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Updated',
      };
    } catch (err) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        'Update image failed',
      );
    }
  }

  async updateFavorite(
    userId,
    updateFavoriteDto: UpdateFavoriteDto,
  ): Promise<THttpResponse<boolean>> {
    try {
      const { publicId } = updateFavoriteDto;

      const photo = await this._photo.findOne({ where: { publicId } });

      const updatedRes = await this._photo.update(
        {
          publicId,
        },
        {
          isFavorite: !photo.isFavorite,
        },
      );

      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Updated favorite',
        data: updatedRes.affected !== 0 ? true : false,
      };
    } catch (err) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        'Update favorite failed',
      );
    }
  }

  async setAvatar(
    userId,
    setAvatarDto: SetAvatarDto,
  ): Promise<THttpResponse<void>> {
    try {
      const { publicId } = setAvatarDto;

      const photo = await this._photo.findOne({ where: { publicId } });

      await this._profileService.update(userId, { avatar: photo.photoUrl });

      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Set avatar succesfully',
      };
    } catch (err) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        'Set avatar failed!',
      );
    }
  }

  // async getAvatar(userId: string) {
  //   try {
  //     const { data: photos } = await this.getUserPhoto(userId);
  //     // const convertDatePhotos = photosRes.data.map(
  //     //   (photo) => (photo.createdAt = new Date(photo.createdAt)),
  //     // );
  //     const favoritePhoto = photos.filter((photo) => photo.isFavorite === true);
  //     if (favoritePhoto.length === 0) {
  //       photos.sort((a, b) => {
  //         const c = new Date(a.createdAt);
  //         const d = new Date(b.createdAt);
  //         return d.getTime() - c.getTime();
  //       });
  //       return photos[0];
  //     }

  //     favoritePhoto.sort((a, b) => {
  //       const c = new Date(a.updatedAt);
  //       const d = new Date(b.updatedAt);
  //       return d.getTime() - c.getTime();
  //     });

  //     return favoritePhoto[0];
  //   } catch (err) {
  //     throw new BadRequestException(HttpStatus.NOT_FOUND, 'No photos found!');
  //   }
  // }
}
