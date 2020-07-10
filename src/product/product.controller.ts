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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { DocumentType } from '@typegoose/typegoose';
import { Product } from './product.model';
import { createProductInput, updateProductInput } from './product.input';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productservice: ProductService) {}

  @Get()
  async index(): Promise<DocumentType<Product>[]> {
    return this.productservice.getProducts();
  }

  @Get(':_id')
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
  async update(
    @Body() updatedata: updateProductInput,
    @Param('_id') productId: string,
  ): Promise<DocumentType<Product>> {
    return this.productservice.updateproduct(productId, updatedata);
  }

  @Delete(':_id')
  async delete(
    @Param('_id') productId: string,
  ): Promise<DocumentType<Product>> {
    return this.productservice.deleteProduct(productId);
  }
}
