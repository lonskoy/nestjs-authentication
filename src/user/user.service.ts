import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.iterface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(email: string, password: string, firstName: string, lastName: string) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);  // Используем await для хеширования пароля
      const createdUser = new this.userModel({ email, password: hashPassword, firstName, lastName });
      return createdUser.save();
    } catch (error) {
      console.log('не удалось создать пользователя');
      console.log(error.message);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      console.log('не удалось вернуть список всех пользователей');
      console.log(error.message);
    }
  }

  async checkUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new Error('Пользователь с таким email не найден');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error('Неверный пароль');
    }

    return user.toObject();
  }
}