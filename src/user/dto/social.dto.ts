import { IsString } from 'class-validator';

export class SocialDto {
  @IsString()
  socialId: string;
}
