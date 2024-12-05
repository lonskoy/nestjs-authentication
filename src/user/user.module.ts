import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';  // Импортируем MongooseModule
import { UserService } from './user.service';
import { UserSchema } from './user.schema';  // Импортируем схему User

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),  // Регистрируем модель User
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}