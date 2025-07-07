import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { SignUpResponseDto } from './dto/signup-response.dto';
import { SignInRequestDto } from './dto/signin-request.dto';
import { SignInResponseDto } from './dto/signin-response.dto';
import { IcommonResponseType } from 'src/common/types';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  // ### Why using promise ?
  async signup(@Body() dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dtoLogin: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signin(dtoLogin);
  }

  @Post('signout')
  signOut(): IcommonResponseType {
    return {
      code: 1,
      message:
        'Signed out successfully. Please remove the token on client side.',
    };
  }
}
