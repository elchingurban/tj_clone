import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }

  async validate(payload: { id: number; email: string }) {
    const data = { id: payload.id, email: payload.email };

    const user = await this.userService.findByCond({ where: data });

    if (!user) {
      throw new UnauthorizedException('Нет доступа к этой странице');
    }
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };
  }
}
