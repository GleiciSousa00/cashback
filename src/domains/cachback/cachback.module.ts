import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CachbackService } from './cachback.service';
import { CachbackController } from './cachback.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [CachbackController],
  providers: [CachbackService],
})
export class CachbackModule {}
