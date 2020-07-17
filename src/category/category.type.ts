import { prop, ModelOptions, pre } from '@typegoose/typegoose';
import { slugify } from 'src/utils/slugify';

@pre<Category>('save', function() {
  this.slug = slugify(this.name, true);
})
@ModelOptions({ schemaOptions: { timestamps: true } })
export class Category {
  @prop({ required: true })
  name: string;
  @prop()
  slug?: string;
}
