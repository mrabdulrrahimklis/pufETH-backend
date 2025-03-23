import { Controller, Get, Param } from '@nestjs/common';
import { ConversionRateService } from './conversion-rate.service';

@Controller('conversion-rate')
export class ConversionRateController {
  constructor(private readonly conversionRateService: ConversionRateService) {}

  @Get()
  getConversionRate(@Param('period') period: 'day' | 'week' | 'month') {
    return this.conversionRateService.getConversionRate(period);
  }

  @Get()
  trackConversionRate() {
    return this.conversionRateService.trackConversionRate();
  }
}
