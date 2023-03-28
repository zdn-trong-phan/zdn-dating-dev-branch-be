import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class PhotoDto {
  @AutoMap()
  @ApiProperty({
    default: 'dd5ef115-3049-433e-9f43-c9b75b7afc13',
    type: String,
  })
  id: string;

  @AutoMap()
  @ApiProperty({
    default: 'dd5ef115-3049-433e-9f43-c9b75b7afc13',
    type: String,
  })
  userId: string;

  @AutoMap()
  @ApiProperty({
    default: 'relzdbarsgbpoqt2ekal',
    type: String,
  })
  publicId: string;

  @AutoMap()
  @ApiProperty({
    default:
      'http://res.cloudinary.com/dtra2soty/image/upload/v1679461059/relzdbarsgbpoqt2ekal.png',
    type: String,
  })
  photoUrl: string;

  @AutoMap()
  @ApiProperty({
    default: false,
    type: Boolean,
  })
  isFavorite: boolean;
}
