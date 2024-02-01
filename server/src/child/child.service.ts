import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  Repository,
  UpdateQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { ChildEntity } from './child.entity';
import { ParentEntity } from 'src/parent/parent.entity';

@Injectable()
export class ChildService {
  constructor(
    @InjectRepository(ChildEntity)
    private readonly childRepo: Repository<ChildEntity>,
    @InjectRepository(ParentEntity)
    private readonly parentRepo: Repository<ParentEntity>,
  ) {}

  async find(userId: number): Promise<ChildEntity[]> {
    return (await this.childRepo.find({ where: { user_id: userId } })).sort(
      (child1, child2) => child1.child_id - child2.child_id,
    );
  }
  async findOne(id: number): Promise<ChildEntity> {
    return await this.childRepo.findOne({ where: { child_id: id } });
  }

  async update(id: number, childEntity: ChildEntity): Promise<UpdateResult> {
    return await this.childRepo.update(id, childEntity);
  }

  async save(childEntity): Promise<ChildEntity> {
    return await this.childRepo.save(childEntity);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.childRepo.delete(id);
  }

  async addUser(userEntity: ParentEntity) {
    return await this.parentRepo.save(userEntity);
  }

  async findUsers(): Promise<ParentEntity[]> {
    return await this.parentRepo.find();
  }
}
