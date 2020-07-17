import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createCategoryInput {
  @ApiProperty({ description: 'The name of the Category' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be atleast 3 characters long' })
  public name: string;
}
export class updateCategoryInput {
  @ApiProperty({ description: 'The name of the Category' })
  @IsOptional()
  @MinLength(3, { message: 'Name must be atleast 3 characters long' })
  public name: string;
}
