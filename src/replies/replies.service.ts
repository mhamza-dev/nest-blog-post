import { Injectable } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RepliesService {
  constructor(private prisma: PrismaService) {}
  create(createReplyDto: CreateReplyDto) {
    return this.prisma.reply.create({ data: createReplyDto });
  }

  findAll() {
    return this.prisma.reply.findMany();
  }

  findOne(id: string) {
    return this.prisma.reply.findUnique({ where: { id: id } });
  }

  findCommentReplies(commentId: string) {
    return this.prisma.reply.findMany({ where: { commentId: commentId } });
  }

  update(id: string, updateReplyDto: UpdateReplyDto) {
    return this.prisma.reply.update({
      where: { id: id },
      data: updateReplyDto,
    });
  }

  remove(id: string) {
    return this.prisma.reply.delete({ where: { id: id } });
  }
}
