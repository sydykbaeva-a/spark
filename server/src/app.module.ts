import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ParentController } from './parent/parent.controller';
import { ChildService } from './child/child.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './db/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildEntity } from './child/child.entity';
import { HabitService } from './habit/habit.service';
import { HabitEntity } from './habit/habit.entity';
import { HabitChildMapEntity } from './habit/habit_child_map.entity';
import { ParentEntity } from './parent/parent.entity';
import { CronService } from './habit/cron.service';
import { ScheduleModule } from '@nestjs/schedule';

import { OpenaiModule } from './openai/openai.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OpenaiController } from './ai-assist/ai-assist.controller';
import { OpenaiService } from './ai-assist/ai-assist.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist', 'client'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      imports: [ConfigModule],
    }),
    TypeOrmModule.forFeature([
      ChildEntity,
      HabitEntity,
      HabitChildMapEntity,
      ParentEntity,
    ]),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    OpenaiModule,
  ],
  controllers: [AppController, ParentController, OpenaiController],
  providers: [
    AppService,
    ChildService,
    HabitService,
    CronService,
    OpenaiService,
  ],
})
export class AppModule {}
