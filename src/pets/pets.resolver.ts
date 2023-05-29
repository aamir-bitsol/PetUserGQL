import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pets.entity';
import { CreatePetInput } from './dto/createPet.dto';
import { Owner } from 'src/owners/entities/owner.entity';
import { UpdatePetInput } from './dto/updatePet.dto';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(private petService: PetsService){}
    
    @Query(returns => [Pet])
    pets(){
        return this.petService.findAll();
    }
    @Mutation(returns => Pet)
    createPet(@Args('data') data: CreatePetInput){
        return this.petService.createPet(data);
    }
    @Query(returns => Pet)
    getPet(@Args('id') id: number){
        return this.petService.findOne(id);
    }

    @ResolveField(returns => Owner)
    Owner(@Parent() pet:Pet){
        return this.petService.getOwner(pet.ownerId);
    }
    
    @Mutation(returns => Pet)
    deletePet(@Args('id') id: number){
        return this.petService.deletePet(id);
    }
    
    @Mutation(returns => Pet)
    updatePet(@Args('id') id: number, @Args('data') data: UpdatePetInput){
        return this.petService.updatePet(id, data);
    }
}
