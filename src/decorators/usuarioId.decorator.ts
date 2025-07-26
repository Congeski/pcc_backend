import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const UsuarioIdFromToken = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService();

    const token = request.headers.authorization?.replace('Bearer ', '');

    const decodedToken: any = jwtService.decode(token);
    
    return decodedToken?.id;
  }
);