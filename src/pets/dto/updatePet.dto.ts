import { Field, InputType , Int} from "@nestjs/graphql";

@InputType()
export class UpdatePetInput{
    @Field()
    name: string;
    
    @Field({nullable:true})
    type?: string;

    @Field(type => Int)
    ownerId: number;
}