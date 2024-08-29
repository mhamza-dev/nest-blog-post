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
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { Response } from 'express';
import { VerifyUserRequest } from 'src/middlewares/verify_user.middleware';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  async create(
    @Req() req: VerifyUserRequest,
    @Body() createReplyDto: CreateReplyDto,
    @Res() res: Response,
  ) {
    try {
      const reply = await this.repliesService.create({
        ...createReplyDto,
        userId: req.user.id,
      });
      return res.status(200).json({ data: reply });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const replies = await this.repliesService.findAll();
      return res.status(200).json({ data: replies });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const reply = await this.repliesService.findOne(id);
      return res.status(200).json({ data: reply });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Get('/comment/:commentId')
  async findCommentReplies(
    @Res() res: Response,
    @Param('commentId') commentId: string,
  ) {
    try {
      const replies = await this.repliesService.findCommentReplies(commentId);
      return res.status(200).json({ data: replies });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateReplyDto: UpdateReplyDto,
  ) {
    try {
      const reply = await this.repliesService.update(id, updateReplyDto);
      return res.status(200).json({ data: reply });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      const reply = await this.repliesService.remove(id);
      return res.status(200).json({ data: reply });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}
