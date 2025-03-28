import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ConversionRateService } from './conversion-rate.service';

@Controller('conversion-rate')
export class ConversionRateController {
  constructor(private readonly conversionRateService: ConversionRateService) {}

  @Get('history')
  async getConversionRate(
    @Query('period') period?: 'day' | 'week' | 'month',
    @Query('page') page?: number,
  ) {
    try {
      return await this.conversionRateService.getConversionRate(period, page);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch conversion rates',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('current')
  async trackConversionRate() {
    try {
      return await this.conversionRateService.getCurrentConversionRate();
    } catch (error) {
      throw new HttpException(
        'Failed to track current conversion rate',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
