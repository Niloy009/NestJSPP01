import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createProductInput {
  @ApiProperty({ description: 'The name of the product' })
  @IsNotEmpty()
  public title: string;

  @ApiProperty({ description: 'The description of the product' })
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Description should be atleast 10 characters long',
  })
  public description: string;

  @ApiProperty({ description: 'The price of the product' })
  @IsNotEmpty()
  public price: number;

  @ApiProperty({ description: 'The ID of categories' })
  @IsOptional()
  public categories: string[];
}
export class updateProductInput {
  @IsOptional()
  @ApiProperty({ description: 'The name of the product', required: false })
  public title: string;

  @IsOptional()
  @ApiProperty({
    description: 'The description of the product',
    required: false,
  })
  @MinLength(10, {
    message: 'Description should be atleast 10 characters long',
  })
  public description: string;

  @IsOptional()
  @ApiProperty({ description: 'The price of the product', required: false })
  public price: number;

  @ApiProperty({ description: 'The ID of categories' })
  @IsOptional()
  public categories: string[];
}
