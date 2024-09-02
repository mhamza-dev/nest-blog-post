import { Injectable } from '@nestjs/common';
import { CreateUserReactionDto } from './dto/create-user_reaction.dto';
import { UpdateUserReactionDto } from './dto/update-user_reaction.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserReactionsService {
  constructor(private prisma: PrismaService){}
  create(createUserReactionDto: CreateUserReactionDto) {
    return this.prisma.userReaction.create({ data: createUserReactionDto });
  }

  findAll() {
    return `This action returns all userReactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userReaction`;
  }

  update(id: number, updateUserReactionDto: UpdateUserReactionDto) {
    return `This action updates a #${id} userReaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} userReaction`;
  }
}
