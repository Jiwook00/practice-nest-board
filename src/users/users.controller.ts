import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { SignupRequestDto } from './dto/signin.request.dto';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { Users } from '../models/users.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getProfile(user: Users) {
    // return user || false;
    return 'test';
  }

  // @Post('signin')
  // async signIn(@Body() body: SignupRequestDto) {
  // }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @ApiResponse({
    status: 200,
    description: '',
  })
  @Post('signup')
  async signUp(@Body() body: SignupRequestDto) {
    const { email, password } = body;
    return await this.userService.signup(email, password);
  }
}
