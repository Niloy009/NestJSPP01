import { IsNotEmpty, MinLength } from 'class-validator';
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
}
export class updateProductInput {
  @ApiProperty({ description: 'The name of the product' })
  public title: string;

  @ApiProperty({ description: 'The description of the product' })
  @MinLength(10, {
    message: 'Description should be atleast 10 characters long',
  })
  public description: string;

  @ApiProperty({ description: 'The price of the product' })
  public price: number;
}
