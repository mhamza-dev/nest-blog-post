import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Response } from 'express';
import { VerifyUserRequest } from 'src/middlewares/verify_user.middleware';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(
    @Req() request: VerifyUserRequest,
    @Body() createPostDto: CreatePostDto,
    @Res() res: Response,
  ) {
    try {
      const post = await this.postsService.create({
        ...createPostDto,
        userId: request.user.id,
      });
      return res
        .status(200)
        .json({ data: post, message: 'Post created successfully' });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('/user/:userId')
  findUserPosts(@Param('userId') userId: string) {
    return this.postsService.findUserPosts(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
