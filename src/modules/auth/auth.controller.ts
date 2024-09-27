import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  async registerUser(@Payload() registerUser: RegisterUserDto) {
    return this.authService.registerUser(registerUser);
  }

  @MessagePattern('auth.login.user')
  async loginUser(@Payload() loginUser: LoginUserDto) {
    return { loginUser };
  }

  @MessagePattern('auth.logout.user')
  async logoutUser() {
    return { message: 'User logged out' };
  }

  @MessagePattern('auth.verify.user')
  async verifyUser() {
    return { message: 'User verified' };
  }
}
