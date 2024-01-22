import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitEntity } from './habit.entity';
import { Repository } from 'typeorm';
import { HabitChildMapEntity } from './habit_child_map.entity';

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(HabitEntity)
    private readonly habitRepo: Repository<HabitEntity>,
    @InjectRepository(HabitChildMapEntity)
    private readonly habitChildMapRepo: Repository<HabitChildMapEntity>,
  ) {}

  // Habit methods
  async find() {
    return (await this.habitRepo.find()).sort(
      (habit1, habit2) => habit1.habit_id - habit2.habit_id,
    );
  }

  async findOne(id: number) {
    return await this.habitRepo.findOne({ where: { habit_id: id } });
  }

  async update(id: number, habitEntity: HabitEntity) {
    return await this.habitRepo.update(id, habitEntity);
  }

  async save(habitEntity) {
    return await this.habitRepo.save(habitEntity);
  }

  async delete(id) {
    return await this.habitRepo.delete(id);
  }

  // Habit Child Map methods
  async findHabitChildMap() {
    return await this.habitChildMapRepo.find();
  }

  async saveHabitChildMap(habitChildMapEntity: HabitChildMapEntity[]) {
    return await this.habitChildMapRepo.save(habitChildMapEntity);
  }

  // Find habits by user id (parent)
  async findHabitsByUser(userId: number): Promise<
    {
      habit_name: string;
      child_id: number;
      child_name: string;
    }[]
  > {
    const habitsByUser = await this.habitRepo
      .createQueryBuilder('habitEntity')
      .innerJoinAndSelect('habitEntity.children', 'childEntity')
      .where('childEntity.user_id = :userId', { userId })
      .select([
        'habitEntity.habit_id AS habit_id',
        'habitEntity.habit_name AS habit_name',
        'childEntity.child_id AS child_id',
        'childEntity.child_name AS child_name',
      ])
      .getRawMany();

    if (!habitsByUser.length) {
      throw new NotFoundException(
        `No habits found for child with User ID: ${userId}`,
      );
    }

    return habitsByUser.map((result) => ({
      habit_id: result.habit_id,
      habit_name: result.habit_name,
      child_id: result.child_id,
      child_name: result.child_name,
    }));
  }
}
