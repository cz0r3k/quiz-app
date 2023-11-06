import { Field, InputType } from '@nestjs/graphql';
import { Question } from '../questions/question.entity';

@InputType()
export class QuizInput {
  @Field()
  name: string;
  // @Field((type) => [Question], {nullable: true})
  // questions?: Question[];
}
