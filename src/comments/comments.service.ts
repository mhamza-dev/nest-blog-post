import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  create(createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({ data: createCommentDto });
  }

  findAll() {
    return this.prisma.comment.findMany();
  }

  findPostComments(postId) {
    return this.prisma.comment.findMany({
      where: { postId: postId },
      include: { post: true },
    });
  }

  findOne(id: string) {
    return this.prisma.comment.findUnique({ where: { id: id } });
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id: id },
      data: updateCommentDto,
    });
  }

  remove(id: string) {
    return this.prisma.comment.delete({where: { id: id}})
  }
}
