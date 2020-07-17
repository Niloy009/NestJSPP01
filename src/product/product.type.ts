import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { Category } from 'src/category/category.type';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  @prop()
  public title: string;
  @prop()
  public description: string;
  @prop()
  public price: number;

  @prop({ ref: 'Category' })
  public categories?: Ref<Category>[];
}
