import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

import { RegisterUserDto } from './dto';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('💎 Connected to the database');
  }

  async registerUser(registerUser: RegisterUserDto) {
    const { email, name, password } = registerUser;
    this.logger.log(email);
    try {
      const user = await this.user.findUnique({ where: { email } });
      if (user) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: 'User already exists',
        });
      }
      const newUser = await this.user.create({
        data: { email, name, password },
      });
      return {
        user: newUser,
        token: 'PDT',
      };
    } catch (error) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
