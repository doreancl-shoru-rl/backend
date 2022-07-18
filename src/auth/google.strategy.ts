import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { Profile } from './interfaces/types';
import { UsersService } from '../users/users.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL,
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.metadata',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
      authorizationURL:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { id } = profile;
      const user = await this.usersService.findOrCreate(
        id,
        'google',
        accessToken,
        refreshToken,
        profile,
      );

      done(null, user);
    } catch (e) {
      console.log(54, e);
    }
  }
}
