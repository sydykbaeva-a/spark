import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChildEntity } from './child.entity';

@Injectable()
export class ChildService {
    constructor(@InjectRepository(ChildEntity) private readonly childRepo: Repository<ChildEntity>){}

    async find(){
        return (await this.childRepo.find()).sort((child1, child2) => child1.child_id - child2.child_id); 
    }
    
    async findOne(id: number){
        return await this.childRepo.findOne({where: {child_id: id}}); 
    }

    async update(id: number, childEntity: ChildEntity){
        return await this.childRepo.update(id, childEntity); 
    }

    async save(childEntity){
        return await this.childRepo.save(childEntity);
    }

    async delete(id){
        return await this.childRepo.delete(id);
    }
}
