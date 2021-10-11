import {
  Controller,
  UseInterceptors,
  UseFilters,
  Get,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { PostRequestDto } from './dto/post.request.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Post()
  async createPost(@Body() body: PostRequestDto) {
    console.log('::body:', body);

    const { title, content } = body;
    return await this.postsService.createPost(title, content);
  }

  @Delete()
  async deletePost() {
    return 'delete';
  }
}
