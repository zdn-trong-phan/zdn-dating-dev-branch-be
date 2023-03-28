import { CloudinaryModule } from './../cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { UserModule } from 'src/user/user.module';
import { ProfileService } from 'src/profile/profile.service';
import { ProfileModule } from 'src/profile/profile.module';
import { Profile } from 'src/profile/entities/profile.entity';
import { PhotoProfile } from './photo.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo, Profile]),
    CloudinaryModule,
    UserModule,
    ProfileModule,
  ],
  controllers: [PhotoController],
  providers: [PhotoService, ProfileService, PhotoProfile],
})
export class PhotoModule {}
