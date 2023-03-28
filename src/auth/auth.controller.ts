import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { FirebaseTokenDto } from './dto/firebase-token.dto';
import { LogInDto } from './dto/log-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleTokenDto } from './dto/gg-token.dto';
import { Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<HttpStatus> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @ApiCreatedResponse({
    description: 'Register new user succesfully',
  })
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this._authService.signUp(signUpDto);
  }

  @ApiCreatedResponse({
    description: 'Log in succesfully',
  })
  @Post('login')
  login(@Body() logInDto: LogInDto) {
    return this._authService.login(logInDto);
  }

  @ApiCreatedResponse({
    description: 'Verify otp token succesfully',
  })
  @Post('verify-otp-token')
  verifyOtpToken(@Body() firebaseTokenDto: FirebaseTokenDto) {
    return this._authService.verifyFirebaseToken(firebaseTokenDto.token);
  }

  @ApiCreatedResponse({
    description: 'Verify google token succesfully',
  })
  @Post('verify-gg-token')
  verifyGgToken(@Body() ggTokenDto: GoogleTokenDto) {
    return this._authService.verifyGgToken(ggTokenDto.token);
  }
}
