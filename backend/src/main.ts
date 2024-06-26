import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app   = await NestFactory.create(AppModule);
  const PORT  = process.env.PORT || 3000;

  const config = new DocumentBuilder().setTitle('Esercizio Ristorante')
                                      .setDescription('Esercizio di introduzione a React e NestJS')
                                      .addBearerAuth()
                                      /*.addSecurity('bearer', {
                                        type: 'http',
                                        scheme: 'bearer',
                                        name: 'Authorization'
                                      })*/
                                      .build();
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
