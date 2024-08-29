import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RepliesController],
  providers: [RepliesService, PrismaService],
})
export class RepliesModule {}
