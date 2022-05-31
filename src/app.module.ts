import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Reseller } from './domains/resellers/entities/resellers.entity';
import { ResellerModule } from './domains/resellers/reseller.module';
import { PurchasesModule } from './domains/purchases/purchases.module';
import { Purchase } from './domains/purchases/entities/purchases.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { CachbackModule } from './domains/cachback/cachback.module';

@Module({
  imports: [
    ResellerModule,
    PurchasesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'dealer_cashback',
      entities: [Reseller, Purchase],
      synchronize: true,
    }),
    AuthModule,
    AuthModule,
    CachbackModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
