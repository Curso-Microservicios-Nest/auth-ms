import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('authRegister')
  registerUser(@Payload() registerUser: RegisterUserDto) {
    return this.authService.registerUser(registerUser);
  }

  @MessagePattern('auth.login.user')
  loginUser(@Payload() loginUser: LoginUserDto) {
    return this.authService.loginUser(loginUser);
  }

  @MessagePattern('auth.verify.user')
  async verifyUser(@Payload() token: string) {
    return this.authService.verifyUser(token);
  }
}
