import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  async registerUser() {
    return 'User registered';
  }

  @MessagePattern('auth.login.user')
  async loginUser() {
    return 'User logged in';
  }

  @MessagePattern('auth.logout.user')
  async logoutUser() {
    return 'User logged out';
  }

  @MessagePattern('auth.verify.user')
  async verifyUser() {
    return 'User verified';
  }
}
