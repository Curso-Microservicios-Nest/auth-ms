import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { LoginUserDto, RegisterUserDto } from './dto';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('💎 Connected to the database');
  }

  async registerUser(registerUser: RegisterUserDto) {
    const { email, name, password } = registerUser;
    const user = await this.user.findUnique({ where: { email } });
    if (user) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User already exists',
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.user.create({
        data: { email, name, password: hashedPassword },
      });
      delete newUser.password;
      return { user: newUser, token: 'PDT' };
    } catch (error) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async loginUser(loginUser: LoginUserDto) {
    const { email, password } = loginUser;
    try {
      const user = await this.user.findUnique({ where: { email } });
      if (!user) {
        throw new RpcException('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new RpcException('Invalid credentials');
      }
      const token = 'PDT';
      delete user.password;
      return { user, token };
    } catch (error) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }
}
