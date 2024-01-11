import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChildEntity } from './child.entity';

@Injectable()
export class ChildService {
    constructor(@InjectRepository(ChildEntity) private readonly childRepo: Repository<ChildEntity>){}

    async find(){
        return await this.childRepo.find(); 
    }

    async save(childEntity){
        return await this.childRepo.save(childEntity);
    }
}
