import { IsArray, IsNumber, IsString, Length, Max, Min } from "class-validator";
export class CarDTO {
  @IsString()
  @Length(3)
  model: string;

  @IsNumber()
  price: number;

  @IsString()
  @Length(11)
  phoneNumber: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  maxPictures: number;

  @IsArray()
  @IsString({ each: true })
  pictures: string[];
}
