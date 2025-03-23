import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from 'config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversionRateModule } from './conversion-rate/conversion-rate.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PrismaModule,
    ConversionRateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
