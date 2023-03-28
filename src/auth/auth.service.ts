import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { OAuth2Client } from 'google-auth-library';
import { ProfileService } from 'src/profile/profile.service';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import IUserPayload from './interfaces/user-payload.interface';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
    private readonly _profileService: ProfileService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthDto> {
    const { phone, email, socialId, gender, name, birthday } = signUpDto;

    try {
      const user = await this._userService.saveUser({
        phone,
        email,
        socialId,
      });

      await this._profileService.save({
        userId: user.id,
        name,
        birthday,
        gender,
      });

      const token = this.signToken({
        id: user.id,
        phone: user.phone,
        email: user.email,
      });

      return {
        statusCode: HttpStatus.CREATED,
        data: {
          token,
        },
      };
    } catch (err) {
      if (err.message.startsWith('duplicate')) {
        throw new HttpException(
          'Phone number exists. Please use another one!',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Please input valid information',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(logInDto: LogInDto): Promise<AuthDto> {
    try {
      await this.verifyFirebaseToken(logInDto.token);

      const user = await this._userService.isPhoneExist(logInDto.phone);

      if (!user.data.checked)
        throw new HttpException(
          'Phone number does not exist. Please sign up!',
          HttpStatus.NOT_FOUND,
        );

      const userPayload = {
        id: user.data.data.id,
        phone: user.data.data.phone,
        email: user.data.data.email,
      };

      const token = this.signToken(userPayload);

      return {
        statusCode: HttpStatus.CREATED,
        data: {
          token,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user found!';
    }

    return {
      message: 'User info',
      user: req.user,
    };
  }

  signToken(userPayload: IUserPayload): string {
    const token = this._jwtService.sign(userPayload, {
      secret: process.env.SECRET_KEY,
      expiresIn: process.env.EXPIRES_IN,
    });

    return token;
  }

  async verifyFirebaseToken(idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (err) {
      throw new HttpException(
        'Please authenticate with your phone number!',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async verifyGgToken(accessToken: string) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: accessToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      console.log(ticket.getPayload());
    } catch (err) {
      throw err;
    }
  }
}
