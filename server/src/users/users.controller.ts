import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete(':id')
  deleteSingleUser(@Param('id') id: string) {
    return this.userService.deleteSingleUser(id);
  }
}
