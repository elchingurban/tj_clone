/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

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
}
