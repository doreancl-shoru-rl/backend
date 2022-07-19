import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { User } from '../../shared';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    // With `@UseGuards(GoogleOauthGuard)` we are using an AuthGuard that @nestjs/passport
    // automatically provisioned for us when we extended the passport-google strategy.
    // The Guard initiates the passport-google flow.
  }

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Passport automatically creates a `user` object, based on the return value of our
    // GoogleOauthStrategy#validate() method, and assigns it to the Request object as `req.user`
    const user = req.user as User;

    // TODO delete
    console.log(
      `${this.googleAuthCallback.name}(): req.user = ${JSON.stringify(
        user,
        null,
        4,
      )}`,
    );

    const { accessToken } = this.jwtAuthService.login(user);
    res.cookie('jwt', accessToken);
    return { access_token: accessToken };
  }
}
