import { ProfileDto } from 'src/profile/dto/profile.dto';

export interface IUserLocation {
  user: string;
  distance: number;
  long: number;
  lat: number;
}

export interface IUserFinded {
  user: ProfileDto;
  distance: number;
  long: number;
  lat: number;
}
