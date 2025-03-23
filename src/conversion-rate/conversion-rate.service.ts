import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ethers } from 'ethers';
import { PrismaService } from '../prisma/prisma.service';

const INFRA_KEY = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`;
@Injectable()
export class ConversionRateService {
  private readonly logger = new Logger(ConversionRateService.name);

  constructor(private prisma: PrismaService) {}

  @Cron('*/2 * * * *')
  async trackConversionRate() {
    const provider = new ethers.JsonRpcProvider(INFRA_KEY);
    const pufETHAbi = [
      'function previewRedeem(uint256) view returns (uint256)',
    ];

    const contract = new ethers.Contract(
      process.env.PUFF_ETH_ADDRESS,
      pufETHAbi,
      provider,
    );

    const amount = ethers.parseEther('1');
    const ethAmount = await contract.previewRedeem(amount);

    this.logger.debug(
      `PUF/ETH: ${ethers.formatEther(amount)} PUF = ${ethers.formatEther(
        ethAmount,
      )} ETH`,
    );

    this.prisma.conversionRate
      .create({
        data: {
          amount: Number(ethers.formatEther(amount)),
          ethAmount: Number(ethers.formatEther(ethAmount)),
        },
      })
      .catch((e) => {
        this.logger.error(e);
      });
  }

  async getConversionRate(period?: 'day' | 'week' | 'month') {
    const now = new Date();
    let dateFilter: Date | undefined;

    switch (period) {
      case 'day':
        dateFilter = new Date(now.setDate(now.getDate() - 1));
        break;
      case 'week':
        dateFilter = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        dateFilter = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        dateFilter = undefined;
    }

    const conversionRate = await this.prisma.conversionRate.findMany({
      where: dateFilter
        ? {
            createdAt: {
              gte: dateFilter,
            },
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    this.logger.debug(`Conversion rate: ${conversionRate}`);

    return conversionRate;
  }
}
