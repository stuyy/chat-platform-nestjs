import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerPath = 'api';

export const swaggerDocumentOptions = new DocumentBuilder()
  .setTitle('NestJS REST API')
  .setDescription('This is a REST API application made with NestJS framework.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export const swaggerSetupOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customCssUrl: '../swagger/swagger.css',
  customfavIcon: '../swagger/favicon.png',
  customSiteTitle: 'Sample app',
};
