import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const category = await this.categoriesService.create(createCategoryDto);
      return res.status(200).json({ data: category });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const categories = await this.categoriesService.findAll();
      return res.status(200).json({ data: categories });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const category = await this.categoriesService.findOne(id);
      return res.status(200).json({ data: category });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const category = await this.categoriesService.update(
        id,
        updateCategoryDto,
      );
      return res.status(200).json({ data: category });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const category = await this.categoriesService.remove(id);
      return res.status(200).json({ data: category });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}
