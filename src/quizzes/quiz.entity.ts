import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Quiz {
  @Field(type => Int)
  id: number;
  @Field()
  name: string;
  @Field(type => [String])
  questions: string[];
}
