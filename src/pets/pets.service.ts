import { Injectable } from '@nestjs/common';
import { Pet } from './pets.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersService } from 'src/owners/owners.service';
import { UpdatePetInput } from './dto/updatePet.dto';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet)
        private petRepo: Repository<Pet>,
        private ownerService: OwnersService,
    ){}

    createPet(data){
        const newPet = this.petRepo.create(data);
        return this.petRepo.save(newPet);
    }
    findAll(){
        return this.petRepo.find();
    }   

    findOne(id:number){
        return this.petRepo.findOneOrFail({where:{id}});
    }

    getOwner(ownerId: number){
        return this.ownerService.findOne(ownerId)
    }

    deletePet(id: number){
        return this.petRepo.delete(id)
    }

    async updatePet(id: number, petData: UpdatePetInput){
        const pet = await this.petRepo.findOne({where:{id}})
        
        if(!pet){
            return "Invalid Pet ID"
        }
        pet.name = petData.name;
        pet.ownerId = petData.ownerId;

        return await this.petRepo.save(pet);
    }
}
