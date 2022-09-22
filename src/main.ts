import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeormStore } from 'connect-typeorm/out';
import { Session } from './utils/typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepository } from 'typeorm';
import { WebsocketAdapter } from './gateway/gateway.adapter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import {
  swaggerPath,
  swaggerDocumentOptions,
  swaggerSetupOptions,
} from './swagger';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const sessionRepository = getRepository(Session);
  const adapter = new WebsocketAdapter(app);
  app.useWebSocketAdapter(adapter);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  app.set('trust proxy', 'loopback');
  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      name: 'CHAT_APP_SESSION_ID',
      cookie: {
        maxAge: 86400000, // cookie expires 1 day later
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);

  /** check if there is Public decorator for each path (action) and its method (findMany / findOne) on each controller */
  Object.values((document as OpenAPIObject).paths).forEach((path: any) => {
    Object.values(path).forEach((method: any) => {
      if (
        Array.isArray(method.security) &&
        method.security.includes('isPublic')
      ) {
        method.security = [];
      }
    });
  });
  SwaggerModule.setup(swaggerPath, app, document, swaggerSetupOptions);
  
  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
      console.log(
        `Running in ${process.env.ENVIRONMENT} mode: ${process.env.ENVIRONMENT_MESSAGE}`,
      );
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
