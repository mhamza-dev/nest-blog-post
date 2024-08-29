import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.create(createUserDto);
      return res
        .status(200)
        .json({
          data: { _id: user.id, email: user.email },
          message: 'User created successfully',
        });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Post('/log_in')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.verifyUser(createUserDto);
      console.log('user =>', user);
      const token = await sign(
        { id: user.id, email: user.email },
        process.env.JWT_TOKEN_SECRET,
        { expiresIn: '1h' },
      );
      return res.status(200).json({
        data: { id: user.id, authToken: token },
        message: 'User verified successfully',
      });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.usersService.findAll();
      return res.status(200).json({ data: users });
    } catch (error) {
      return res.status(404).json({ data: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(id);
      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(404).json({ data: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(404).json({ data: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.remove(id);
      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(404).json({ data: error.message });
    }
  }
}
