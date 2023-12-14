import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Public()
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Public()
  @Delete(':id')
  deleteSingleUser(@Param('id') id: string) {
    return this.userService.deleteSingleUser(id);
  }
}
