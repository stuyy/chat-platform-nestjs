import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env.development' }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
