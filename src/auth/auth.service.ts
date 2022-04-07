/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({
      where: {
        email,
        password,
      },
    });
    if (user && user.password === password) {
      //Destructures password and returns results. I.e, every entity of user except password
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity): Promise<any> {
    const { password, ...userData } = user;
    const payload = { email: user.email, id: user.id };
    return {
      ...userData,
      access_token: this.jwtService.sign(payload),
    };
  }
}
