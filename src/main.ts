  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import { ConfigService } from '@nestjs/config';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const congigService = app.get(ConfigService);
    await app.listen(congigService.get<string>('PORT') );
    console.log('Запущен сервер на порту: ', congigService.get<string>('PORT') );
  }
  bootstrap();
