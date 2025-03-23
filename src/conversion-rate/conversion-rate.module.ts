import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ConversionRateController } from './conversion-rate.controller';
import { ConversionRateService } from './conversion-rate.service';

@Module({
  controllers: [ConversionRateController],
  imports: [PrismaModule],
  providers: [ConversionRateService],
  exports: [ConversionRateService],
})
export class ConversionRateModule {}
