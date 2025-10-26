import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async register(input: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        displayName: input.displayName
      }
    });

    return this.generateAuthPayload(user.id, user.email, user.displayName);
  }

  async login(input: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAuthPayload(user.id, user.email, user.displayName);
  }

  private generateAuthPayload(id: string, email: string, displayName: string) {
    const token = this.jwt.sign({ sub: id, email, displayName });
    return {
      accessToken: token,
      user: {
        id,
        email,
        displayName
      }
    };
  }
}
