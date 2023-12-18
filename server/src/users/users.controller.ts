import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { UpdateUserDto } from 'src/auth/dto';

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

  @Put('me')
  updateMe(@GetCurrentUserId() userId: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateMe(userId, dto);
  }

  @Delete('me')
  deleteSingleUser(@GetCurrentUserId() userId: string) {
    return this.userService.deleteSingleUser(userId);
  }
}
