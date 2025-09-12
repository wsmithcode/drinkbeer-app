import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module'
import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import { DrinksModule } from './modules/drinks/drinks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    PrismaModule, UserModule, AuthModule, DrinksModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
