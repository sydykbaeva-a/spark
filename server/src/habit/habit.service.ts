import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitEntity } from './habit.entity';
import { Repository } from 'typeorm';
import { HabitChildMapEntity } from './habit_child_map.entity';
import { ChildEntity } from 'src/child/child.entity';

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

  async deleteHabitChildMap(habitChildMapId: number) {
    return await this.habitChildMapRepo.delete(habitChildMapId);
  }

  async findOneHabitChildMap(childId: number, habitId: number) {
    return await this.habitChildMapRepo.findOne({
      where: { child_id: childId, habit_id: habitId },
    });
  }

  async updateHabitChildMap(
    habitChildMapId: number,
    habitChildMapEntity: HabitChildMapEntity,
  ) {
    return await this.habitChildMapRepo.update(
      habitChildMapId,
      habitChildMapEntity,
    );
  }

  async updateHabitChildMapById(
    childId: number,
    habitId: number,
    habitChildMapEntity: HabitChildMapEntity,
  ) {
    const habitChildMapRecord = await this.findOneHabitChildMap(
      childId,
      habitId,
    );
    if (habitChildMapRecord) {
      const habitChildMapId = habitChildMapRecord.habit_child_map_id;
      return await this.updateHabitChildMap(
        habitChildMapId,
        habitChildMapEntity,
      );
    }
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
      .createQueryBuilder('habit')
      .leftJoinAndSelect('habit.habitChildMap', 'habitChildMap')
      .leftJoinAndSelect('habitChildMap.child', 'child')
      .where('child.user_id = :userId', { userId })
      .select([
        'habit.habit_id AS habit_id',
        'habit.habit_name AS habit_name',
        'child.child_id AS child_id',
        'child.child_name AS child_name',
        'habitChildMap.habit_status AS habit_status',
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
      habit_status: result.habit_status,
    }));
  }

  //cron job to daily reset of habit_status to false
  async updateHabitStatusToFalse(): Promise<void> {
    await this.habitChildMapRepo.update({}, { habit_status: false });
  }
}
