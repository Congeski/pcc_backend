import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../service/prisma.service';
import { Usuario } from '@prisma/client';
import * as crypto from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(crypto.scrypt);

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUserHasPassword(email: string): Promise<boolean> {
    try {
      const user = await this.prisma.usuario.findUnique({
        where: { email_institucional: email },
        select: { senha: true },
      });
      return user !== null && user.senha !== null;
    } catch (error) {
      console.error('Erro ao verificar senha do usuário: ', error);
      return false;
    }
  }

  async createPassword(email: string, password: string): Promise<Usuario> {
    try {
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = (await scryptAsync(password, salt, 32)) as Buffer;

      const hashedPassword = salt + '.' + hash.toString('hex');

      const usuario = await this.prisma.usuario.update({
        where: { email_institucional: email },
        data: { senha: hashedPassword },
      });

      return usuario;
    } catch (error) {
      console.error('Erro ao criar senha do usuário: ', error);
      throw new Error('Não foi possível criar a senha do usuário.');
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; usuario_id: string }> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email_institucional: email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    if (!usuario.senha) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    const [salt, storedHash] = usuario.senha.split('.');
    const hash = (await scryptAsync(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('Email ou senha inválidos.');
    }

    const payload = { id: usuario.id };
    return {
      accessToken: this.jwtService.sign(payload),
      usuario_id: payload.id,
    };
  }
}