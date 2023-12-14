import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAllUsers() {
    return { msg: 'hi from erdem' };
  }
}
