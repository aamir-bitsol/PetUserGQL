import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOwnerInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;
}
