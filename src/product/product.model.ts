import { prop } from '@typegoose/typegoose';

export class Product {
  @prop()
  public title: string;
  @prop()
  public description: string;
  @prop()
  public price: number;
}
