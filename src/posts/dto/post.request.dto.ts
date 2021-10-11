import { IsString, IsNotEmpty } from 'class-validator';

export class PostRequestDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public content: string;
}
