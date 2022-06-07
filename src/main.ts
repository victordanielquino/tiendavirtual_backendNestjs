import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // se llegan atributos que no estan definidos en el dtos, los ignora y continua
      forbidNonWhitelisted: true, // alerta de atributos que no esta definido en el esquema de los dtos
      transformOptions: {enableImplicitConversion: true}, // convierte string a number en @Query params
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('TIENDA VIRTUAL')
    .setVersion('1.0')
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // habilitar acceso a todos CORS:
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
