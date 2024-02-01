import { Injectable } from '@nestjs/common';
import { HabitService } from './habit.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor(private habitService: HabitService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'Asia/Almaty' })
  //   @Cron('*/2 * * * *', { timeZone: 'Asia/Almaty' }) // Run every 2 minutes
  async handleCron() {
    console.log('Running cron job...');
    await this.habitService.updateHabitStatusToFalse();
    console.log('Completed cron job.');
  }
}
