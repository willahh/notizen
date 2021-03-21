import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      // Local run dev
      'http://localhost:3006',
      'http://192.168.0.14:3006',

      // Local serve build
      'http://localhost:5000',

      // Github page
      'https://willahh.github.io',
    ],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // // Swagger
  // const config = new DocumentBuilder()
  //   .setTitle('Notizen')
  //   .setDescription('The Notizen API description')
  //   .setVersion('1.0')
  //   .addTag('notizen')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // console.log('document', document);

  // SwaggerModule.setup('api', app, document);

  // Listen
  const PORT = Number(process.env.PORT) || 3000;
  await app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
}
bootstrap();
