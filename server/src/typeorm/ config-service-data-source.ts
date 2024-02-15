import { registerAs } from '@nestjs/config';

import { DataSourceOptions } from 'typeorm';
import { ParentEntity } from '../parent/parent.entity';
import { HabitChildMapEntity } from '../habit/habit_child_map.entity';
import { HabitEntity } from '../habit/habit.entity';
import { ChildEntity } from '../child/child.entity';

export default registerAs('typeorm-datasource', () => {
  const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    database: 'neondb',
    ssl: true,
    entities: [ParentEntity, ChildEntity, HabitChildMapEntity, HabitEntity],
  };
  return dataSourceOptions;
});
