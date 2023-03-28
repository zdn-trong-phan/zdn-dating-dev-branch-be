// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Profile, Strategy } from 'passport-facebook';

// import * as dotenv from 'dotenv';

// dotenv.config();

// @Injectable()
// export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
//   constructor() {
//     super({
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_SECRET_ID,
//       callbackURL: 'http://localhost:8080/auth/facebook/redirect',
//       scope: 'email',
//       profileFields: ['emails', 'name'],
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile,
//     done: (err: any, user: any, info?: any) => void,
//   ): Promise<void> {
//     console.log(profile);
//     const { name, emails, id } = profile;
//     const user = {
//       id,
//       name: `${name.givenName} ${name.familyName}`,
//       email: emails[0].value,
//     };

//     const payload = {
//       user,
//       accessToken,
//     };

//     done(null, payload);
//   }
// }
