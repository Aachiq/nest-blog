import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { SignUpResponseDto } from './dto/signup-response.dto';
import { SignInRequestDto } from './dto/signin-request.dto';
import { SignInResponseDto } from './dto/signin-response.dto';
import { IcommonResponseType } from 'src/common/types';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  // ### Why using promise ?
  async signup(@Body() dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(
    @Body() dtoLogin: SignInRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInResponseDto> {
    return this.authService.signin(dtoLogin, res);
  }

  @Get('signout')
  signOut(@Res({ passthrough: true }) res: Response): IcommonResponseType {
    res.clearCookie('jwt');
    return {
      code: 1,
      message: 'Signed out successfully',
    };
  }
}
