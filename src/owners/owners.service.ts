import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepo: Repository<Owner>,
  ) { }
  create(createOwnerInput: CreateOwnerInput) {
    const owner = this.ownerRepo.create(createOwnerInput);
    return this.ownerRepo.save(owner);
  }

  findAll() {
    return this.ownerRepo.find();
  }

  findOne(id: number) {
    return this.ownerRepo.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput) {
    const owner = await this.ownerRepo.findOne({ where: { id } });

    if (!owner) {
      return "Invalid Owner ID";
    }

    owner.name = updateOwnerInput.name;
    owner.pets = updateOwnerInput.pets;
    return await this.ownerRepo.save(owner);
  }

  remove(id: number) {
    return this.ownerRepo.delete(id);
  }
}
