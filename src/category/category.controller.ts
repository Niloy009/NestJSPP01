import {
  Controller,
  Get,
  Query,
  UseFilters,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResourcePagination, ResourceList } from 'src/shared/types';
import { DocumentType } from '@typegoose/typegoose';
import { Category } from './category.type';
import { InvalidObjectId } from 'src/shared/object-castid.filter';
import { createCategoryInput, updateCategoryInput } from './category.input';
import { QCExceptionFilter } from 'src/shared/qc.filter';
import { ApiPagination } from 'src/utils/ApiPagination.decorator';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryservice: CategoryService) {}

  @Get()
  @ApiPagination()
  async index(
    @Query() query: ResourcePagination,
  ): Promise<ResourceList<DocumentType<Category>>> {
    return this.categoryservice.getCategories(query);
  }

  @Get(':_id')
  @UseFilters(InvalidObjectId)
  async show(
    @Param('_id') categoryId: string,
  ): Promise<DocumentType<Category>> {
    return this.categoryservice.getCategoryById(categoryId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async store(
    @Body() data: createCategoryInput,
  ): Promise<DocumentType<Category>> {
    return this.categoryservice.createcategory(data);
  }

  @Put(':_id')
  @UsePipes(ValidationPipe)
  @UseFilters(QCExceptionFilter)
  async update(
    @Body() updatedata: updateCategoryInput,
    @Param('_id') categoryId: string,
  ): Promise<DocumentType<Category>> {
    return this.categoryservice.updatecategory(categoryId, updatedata);
  }

  @Delete(':_id')
  @UseFilters(QCExceptionFilter)
  async delete(
    @Param('_id') categoryId: string,
  ): Promise<DocumentType<Category>> {
    return this.categoryservice.deleteCategory(categoryId);
  }
}
