import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChildEntity } from 'src/child/child.entity';
import { ChildService } from 'src/child/child.service';

@Controller('parent')
export class ParentController {
    constructor(private readonly childService: ChildService){}
    @Get()  // HTTP methods 
    async find(){
        return await this.childService.find();
    }

    @Post('child_add')  
    async save(@Body() childEntity: ChildEntity){
        await this.childService.save(childEntity);
        return this.find();
    }
}
