import { Field, InputType } from '@nestjs/graphql';
import { QuestionInput } from '../question.input';

@InputType()
export class SingleCorrectAnswerInput extends QuestionInput {
  @Field((type) => [String])
  answers: string[];
  @Field()
  correctAnswer: string;
}
