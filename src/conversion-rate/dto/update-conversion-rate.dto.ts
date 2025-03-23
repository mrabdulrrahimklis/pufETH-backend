import { PartialType } from '@nestjs/mapped-types';
import { CreateConversionRateDto } from './create-conversion-rate.dto';

export class UpdateConversionRateDto extends PartialType(CreateConversionRateDto) {}
