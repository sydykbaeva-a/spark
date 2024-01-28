import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChildEntity } from 'src/child/child.entity';
import { ChildService } from 'src/child/child.service';
import { HabitEntity } from 'src/habit/habit.entity';
import { HabitService } from 'src/habit/habit.service';
import { HabitChildMapEntity } from 'src/habit/habit_child_map.entity';
import { ParentEntity } from './parent.entity';

@Controller('parent')
export class ParentController {
  constructor(
    private readonly childService: ChildService,
    private readonly habitService: HabitService,
  ) {}

  @Get('/:userId/children') // HTTP methods
  async find(@Param('userId') userId: number): Promise<ChildEntity[]> {
    return await this.childService.find(userId);
  }

  @Post('/:userId/child_add')
  async save(
    @Param('userId') userId: number,
    @Body() childEntity: ChildEntity,
  ): Promise<ChildEntity[]> {
    await this.childService.save(childEntity);
    return await this.childService.find(userId);
  }

  @Get('child/:id')
  async findOne(@Param('id') id: number): Promise<ChildEntity> {
    return await this.childService.findOne(id);
  }

  @Patch('/:userId/child_edit/:id')
  async update(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() childEntity: ChildEntity,
  ): Promise<ChildEntity[]> {
    await this.childService.update(id, childEntity);
    return await this.childService.find(userId);
  }

  @Delete('/:userId/child_delete/:id')
  async delete(
    @Param('userId') userId: number,
    @Param('id') id: number,
  ): Promise<ChildEntity[]> {
    await this.childService.delete(id);
    return await this.childService.find(userId);
  }

  // Habit methods
  @Get('habit')
  async findHabits(): Promise<HabitEntity[]> {
    return await this.habitService.find();
  }

  @Post('habit_add')
  async saveHabit(@Body() habitEntity: HabitEntity): Promise<HabitEntity[]> {
    await this.habitService.save(habitEntity);
    return await this.habitService.find();
  }

  @Get('habit/:id')
  async findOneHabit(@Param('id') id: number): Promise<HabitEntity> {
    return await this.habitService.findOne(id);
  }

  @Patch('habit_edit/:id')
  async updateHabit(
    @Param('id') id: number,
    @Body() habitEntity: HabitEntity,
  ): Promise<HabitEntity[]> {
    await this.habitService.update(id, habitEntity);
    return await this.habitService.find();
  }

  @Delete('habit_delete/:id')
  async deleteHabit(@Param('id') id: number): Promise<HabitEntity[]> {
    await this.habitService.delete(id);
    return await this.habitService.find();
  }

  // Habit Child Map methods
  @Get('habit_child_map')
  async findHabitChildMap(): Promise<HabitChildMapEntity[]> {
    return await this.habitService.findHabitChildMap();
  }

  @Post('habit_child_map_add')
  async saveHabitChildMap(
    @Body() habitChildMapEntity: HabitChildMapEntity[],
  ): Promise<HabitChildMapEntity[]> {
    await this.habitService.saveHabitChildMap(habitChildMapEntity);
    return await this.habitService.findHabitChildMap();
  }

  @Delete('habit_child_map/:id')
  async deleteHabitChildMap(
    @Param('id') habitChildMapId: number,
  ): Promise<HabitChildMapEntity[]> {
    await this.habitService.deleteHabitChildMap(habitChildMapId);
    return await this.habitService.findHabitChildMap();
  }

  @Patch('habit_child_map/child/:childId/habit/:habitId')
  async updateHabitChildMap(
    @Param('childId') childId: number,
    @Param('habitId') habitId: number,
    @Body() habitChildMapEntity: HabitChildMapEntity,
  ): Promise<HabitChildMapEntity[]> {
    await this.habitService.updateHabitChildMapById(
      childId,
      habitId,
      habitChildMapEntity,
    );
    return await this.habitService.findHabitChildMap();
  }

  @Get('one_habit_child_map/child/:childId/habit/:habitId')
  async findOneHabitChildMap(
    @Param('childId') childId: number,
    @Param('habitId') habitId: number,
  ): Promise<HabitChildMapEntity> {
    return await this.habitService.findOneHabitChildMap(childId, habitId);
  }

  // Find habits by user id (parent)
  @Get(':id/habits') //pass a user_id
  async findHabitsByUser(@Param('id') id: number) {
    return await this.habitService.findHabitsByUser(id);
  }

  @Post('user_add')
  async addUser(@Body() user: ParentEntity) {
    await this.childService.addUser(user);
    return await this.childService.findUsers();
  }

  @Get('users')
  async findUsers() {
    return await this.childService.findUsers();
  }
}
