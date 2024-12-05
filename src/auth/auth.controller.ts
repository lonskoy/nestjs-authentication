import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService // Исправлен инжект
  ) {}

  // Регистрация нового пользователя
  @Post('register')
  async regUser(@Body() body) {
    const { email, password, firstName, lastName } = body;
    const user = await this.userService.createUser(email, password, firstName, lastName);
    console.log('Пользователь создан:', user);
    return { message: 'Пользователь успешно зарегистрирован', user };
  }

  @Get('alluser')
  async giveAllUser() {
    const allUser = await this.userService.getAll();
    console.log(allUser)
    return allUser
  }

  // Логин
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('Пользователь успешно вошел:', req.user);
    return this.authService.login(req.user);
  }

  // Защищенный маршрут
  @UseGuards(JwtAuthGuard)
  @Post('protected')
  async protectedRoute(@Request() req) {
    console.log('Доступ разрешен');
    return { message: 'Доступ разрешен', user: req.user };
  }
}