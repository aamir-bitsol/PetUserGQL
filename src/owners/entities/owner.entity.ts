import { Entity,Column, OneToMany, PrimaryGeneratedColumn  } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from 'src/pets/pets.entity';

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(type=> Int)
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(()=>Pet, pet=> pet.owner)
  @Field(type=> [Pet], {nullable:true})
  pets?: Pet[];
  
}

