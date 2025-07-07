import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { SignUpResponseDto } from './dto/signup-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  // ### Why using promise ?
  async signup(@Body() dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signup(dto);
  }
}
