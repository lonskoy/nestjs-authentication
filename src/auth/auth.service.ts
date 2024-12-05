import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  // Авторизация пользователя
  async validateUser(email: string, password: string) {
    const user = await this.usersService.checkUser(email, password);
    if (user) {
      // Удаляем пароль из возвращаемого объекта
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Логин: создаем JWT
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    console.log('Токен выдан:', token);
    return { access_token: token };
  }
}