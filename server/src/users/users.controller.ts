import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUserId, Public } from 'src/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('me')
  getMe(@GetCurrentUserId() userId: string) {
    return this.userService.getMe(userId);
  }

  @Delete('me')
  deleteSingleUser(@GetCurrentUserId() userId: string) {
    return this.userService.deleteSingleUser(userId);
  }
}
