import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  async createUser() {
    // TODO createUser
  }

  @Put(':id')
  async updateUser(@Param() params) {
    // TODO updateUser
  }

  @Delete(':id')
  async deleteUser(@Param() params) {
    // TODO deleteUser
  }

  @Get(':id')
  async getUserById(@Param() params) {
    // TODO getUserById
  }
}
