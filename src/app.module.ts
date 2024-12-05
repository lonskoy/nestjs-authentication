import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';  // Импортируем mongoose для ручного контроля
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot("mongodb+srv://lonskoy0304:QeV6cIoPj2x5Y3K6@cluster0.lb8c1lp.mongodb.net/express?retryWrites=true&w=majority"), // Строка подключения
    ConfigModule.forRoot({
      isGlobal: true, // Делает конфигурацию env доступной во всем приложении
    }),
  ],
})
export class AppModule implements OnModuleInit {
  // Метод, вызываемый при старте приложения
  async onModuleInit() {
    try {
      // Подключаемся вручную через mongoose и обрабатываем успешное подключение
      await mongoose.connect(process.env.BD_CONNECT);
      console.log('БД успешно подключена');
    } catch (error) {
      console.error('Ошибка подключения к базе данных:', error);
    }
  }
}