import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserReactionsService } from './user_reactions.service';
import { CreateUserReactionDto } from './dto/create-user_reaction.dto';
import { UpdateUserReactionDto } from './dto/update-user_reaction.dto';
import { VerifyUserRequest } from 'src/middlewares/verify_user.middleware';

@Controller('user-reactions')
export class UserReactionsController {
  constructor(private readonly userReactionsService: UserReactionsService) {}

  @Post()
  create(@Req() req: VerifyUserRequest, @Body() createUserReactionDto: CreateUserReactionDto) {
    return this.userReactionsService.create({...createUserReactionDto, userId: req.user.id});
  }

  @Get()
  findAll() {
    return this.userReactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userReactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserReactionDto: UpdateUserReactionDto) {
    return this.userReactionsService.update(+id, updateUserReactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userReactionsService.remove(+id);
  }
}
