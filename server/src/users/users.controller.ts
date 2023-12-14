import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUserId, Public } from 'src/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Public()
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('me')
  getMe(@GetCurrentUserId() userId: string) {
    return this.userService.getMe(userId);
  }

  @Public()
  @Delete(':id')
  deleteSingleUser(@Param('id') id: string) {
    return this.userService.deleteSingleUser(id);
  }
}
