import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Product } from './product.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { createProductInput, updateProductInput } from './product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: ReturnModelType<typeof Product>,
  ) {}

  async getProducts(): Promise<DocumentType<Product>[]> {
    return this.productModel.find();
  }

  async createproduct(
    data: createProductInput,
  ): Promise<DocumentType<Product>> {
    return this.productModel.create(data);
  }

  async updateproduct(
    _id: string,
    updateddata: updateProductInput,
  ): Promise<DocumentType<Product>> {
    return this.productModel.findOneAndUpdate({ _id }, updateddata, {
      new: true,
    });
  }

  async getProductById(_id: string): Promise<DocumentType<Product>> {
    return this.productModel.findById(_id);
  }

  async deleteProduct(_id: string): Promise<DocumentType<Product>> {
    if (!this.getProductById(_id))
      throw new NotFoundException(
        'Product is not available or deleted Successfully',
      );
    return this.productModel.findOneAndDelete({ _id });
  }
}
