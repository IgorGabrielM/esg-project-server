import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.validateUser(
      createAuthDto.email,
      createAuthDto.password,
    );
  }
}
