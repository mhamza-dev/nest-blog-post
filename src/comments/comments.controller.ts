import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { VerifyUserRequest } from 'src/middlewares/verify_user.middleware';
import { Response } from 'express';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Req() req: VerifyUserRequest,
    @Body() createCommentDto: CreateCommentDto,
    @Res() res: Response,
  ) {
    try {
      const comment = await this.commentsService.create({
        ...createCommentDto,
        userId: req.user.id,
      });
      return res.status(200).json({ data: comment });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const comments = await this.commentsService.findAll();
      return res.status(200).json({ data: comments });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const comments = await this.commentsService.findOne(id);
      return res.status(200).json({ data: comments });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Get('/post/:postId')
  async findPostComments(
    @Param('postId') postId: string,
    @Res() res: Response,
  ) {
    try {
      const comments = await this.commentsService.findPostComments(postId);
      return res.status(200).json({ data: comments });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Res() res: Response,
  ) {
    try {
      const comment = await this.commentsService.update(id, updateCommentDto);
      return res.status(200).json({ data: comment });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const comment = await this.commentsService.remove(id);
      return res.status(200).json({ data: comment });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}
