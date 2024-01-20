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

@Controller('parent')
export class AdminController {
  constructor(private readonly childService: ChildService) {}

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
}
