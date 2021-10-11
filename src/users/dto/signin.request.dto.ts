import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupRequestDto {
  @ApiProperty({
    example: 'danny@make.education',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    example: '12345@!',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
