import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
const bcrypt = require('bcrypt')

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create({ email, password }: CreateUserDto): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      email: email,
      hashedPassword: hashedPassword,
    };
    return this.prisma.user.create({ data });
  }

  async verifyUser({email, password}: CreateUserDto)  {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  findAll(): Promise<User[] | []> {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({where: {id: id}})
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id: id }, data: updateUserDto });
  }

  remove(id: string) {
    return this.prisma.user.delete( {where: {id: id}})
  }
}
