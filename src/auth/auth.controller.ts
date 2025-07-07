import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('has-password/:email_institucional')
  @HttpCode(200)
  async verifyUserHasPassword(
    @Param('email_institucional') email_institucional: string,
  ) {
    return await this.authService.verifyUserHasPassword(email_institucional);
  }

  @Patch('create-password/:email_institucional')
  @HttpCode(201)
  async createPassword(
    @Param('email_institucional') email_institucional: string,
    @Body('senha') senha: string,
  ) {
    return this.authService.createPassword(email_institucional, senha);
  }

  @Post('login/:email_institucional')
  @HttpCode(200)
  async login(
    @Param('email_institucional') email_institucional: string,
    @Body('senha') senha: string,
  ) {
    return this.authService.login(email_institucional, senha);
  }
}
