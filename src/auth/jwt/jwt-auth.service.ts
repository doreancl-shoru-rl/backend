import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, User } from '../../shared';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user: User) {
    console.log('login', { user });
    const { id, displayName, photos } = user;
    const payload: JwtPayload = {
      sub: id,
      displayName,
      photo: photos?.[0]?.value,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
