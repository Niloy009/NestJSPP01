import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Product } from './product.type';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { createProductInput, updateProductInput } from './product.input';
import { ResourceList, ResourcePagination } from 'src/shared/types';
import { index, show, destroy, update, store } from 'quick-crud';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: ReturnModelType<typeof Product>,
  ) {}

  async getProducts(
    pagination: ResourcePagination,
  ): Promise<ResourceList<DocumentType<Product>>> {
    if (pagination.limit) pagination.limit = +pagination.limit;
    if (pagination.page) pagination.page = +pagination.page;
    return index({
      model: this.productModel,
      paginationOptions: pagination,
    });
  }

  async createproduct(
    data: createProductInput,
  ): Promise<DocumentType<Product>> {
    return store({ model: this.productModel, data });
  }

  async updateproduct(
    _id: string,
    updateddata: updateProductInput,
  ): Promise<DocumentType<Product>> {
    return update({
      model: this.productModel,
      where: { _id },
      data: updateddata,
    });
  }

  async getProductById(_id: string): Promise<DocumentType<Product>> {
    return show({ model: this.productModel, where: { _id } });
  }

  async deleteProduct(_id: string): Promise<DocumentType<Product>> {
    return destroy({ model: this.productModel, where: { _id } });
  }
}
