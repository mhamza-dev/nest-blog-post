import { Module } from '@nestjs/common';
import { UserReactionsService } from './user_reactions.service';
import { UserReactionsController } from './user_reactions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserReactionsController],
  providers: [UserReactionsService, PrismaService],
})
export class UserReactionsModule {}
