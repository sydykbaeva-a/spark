import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChildEntity } from 'src/child/child.entity';
import { ChildService } from 'src/child/child.service';

@Controller('parent')
export class ParentController {
    constructor(private readonly childService: ChildService){}
    @Get('child')  // HTTP methods 
    async find(): Promise<ChildEntity[]>{
        return await this.childService.find();
    }

    @Post('child_add')  
    async save(@Body() childEntity: ChildEntity)
    {
        await this.childService.save(childEntity);
        return await this.childService.find();
    }

    @Get('child/:id')   
    async findOne(@Param('id') id: number): Promise<ChildEntity>{
        return await this.childService.findOne(id);
    }

    @Patch('child_edit/:id')
    async update(@Param('id') id: number, @Body() childEntity: ChildEntity): Promise<ChildEntity[]>{
        await this.childService.update(id, childEntity);
        return await this.childService.find();
    }

    @Delete('child_delete/:id')
    async delete(@Param('id') id: number): Promise<ChildEntity[]>{
        await this.childService.delete(id);
        return await this.childService.find();
    }
}
