import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminController } from './parent/parent.controller';
import { ChildService } from './child/child.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './db/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildEntity } from './child/child.entity';
import { HabitService } from './habit/habit.service';
import { HabitEntity } from './habit/habit.entity';
import { HabitChildMapEntity } from './habit/habit_child_map.entity';
import { ParentEntity } from './parent/parent.entity';

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
  ],
  controllers: [AppController, AdminController],
  providers: [AppService, ChildService, HabitService],
})
export class AppModule {}
