import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from './category.type';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { ResourcePagination, ResourceList } from 'src/shared/types';
import { index, store, update, show, destroy } from 'quick-crud';
import { createCategoryInput, updateCategoryInput } from './category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  async getCategories(
    pagination: ResourcePagination,
  ): Promise<ResourceList<DocumentType<Category>>> {
    if (pagination.limit) pagination.limit = +pagination.limit;
    if (pagination.page) pagination.page = +pagination.page;
    return index({ model: this.categoryModel, paginationOptions: pagination });
  }

  async createcategory(
    data: createCategoryInput,
  ): Promise<DocumentType<Category>> {
    // return this.categoryModel.create(data);
    return store({ model: this.categoryModel, data });
  }

  async updatecategory(
    _id: string,
    updateddata: updateCategoryInput,
  ): Promise<DocumentType<Category>> {
    return update({
      model: this.categoryModel,
      where: { _id },
      data: updateddata,
    });
  }

  async getCategoryById(_id: string): Promise<DocumentType<Category>> {
    return show({ model: this.categoryModel, where: { _id } });
  }
  async deleteCategory(_id: string): Promise<DocumentType<Category>> {
    return destroy({ model: this.categoryModel, where: { _id } });
  }
}
