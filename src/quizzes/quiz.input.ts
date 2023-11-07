import { Field, InputType } from '@nestjs/graphql';
import { QuestionInput } from '../questions/question.input';

@InputType()
export class QuizInput {
  @Field()
  name: string;
  @Field((type) => [QuestionInput], { nullable: true })
  questions?: QuestionInput[];
}
