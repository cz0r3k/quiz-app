import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '../questions/question.entity';

@ObjectType()
export class Quiz {
  @Field(type => Int)
  id: number;
  @Field()
  name: string;
  @Field(type => [Question])
  questions: Question[];
}
