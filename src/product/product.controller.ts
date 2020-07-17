import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { DocumentType } from '@typegoose/typegoose';
import { Product } from './product.type';
import { createProductInput, updateProductInput } from './product.input';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { ResourceList, ResourcePagination } from 'src/shared/types';
import { InvalidObjectId } from 'src/shared/object-castid.filter';
import { QCExceptionFilter } from 'src/shared/qc.filter';
import { ApiPagination } from 'src/utils/ApiPagination.decorator';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productservice: ProductService) {}

  @Get()
  @ApiPagination()
  async index(
    @Query() query: ResourcePagination,
  ): Promise<ResourceList<DocumentType<Product>>> {
    return this.productservice.getProducts(query);
  }

  @Get(':_id')
  @UseFilters(InvalidObjectId)
  async show(@Param('_id') productId: string): Promise<DocumentType<Product>> {
    return this.productservice.getProductById(productId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async store(
    @Body() data: createProductInput,
  ): Promise<DocumentType<Product>> {
    return this.productservice.createproduct(data);
  }

  @Put(':_id')
  @UsePipes(ValidationPipe)
  @UseFilters(QCExceptionFilter)
  async update(
    @Body() updatedata: updateProductInput,
    @Param('_id') productId: string,
  ): Promise<DocumentType<Product>> {
    return this.productservice.updateproduct(productId, updatedata);
  }

  @Delete(':_id')
  @UseFilters(QCExceptionFilter)
  async delete(
    @Param('_id') productId: string,
  ): Promise<DocumentType<Product>> {
    return this.productservice.deleteProduct(productId);
  }
}
