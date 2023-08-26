import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) createUser: CreateAuthDto) {
    return await this.authService.create(createUser);
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) loginUser: Partial<CreateAuthDto>) {
    const data = await this.authService.login(loginUser);
    return data;
  }
}
