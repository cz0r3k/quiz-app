import { QuestionInput } from '../question.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MultipleCorrectAnswersInput extends QuestionInput {
  @Field()
  answers: string;
  @Field((type) => [String])
  correctAnswers: string[];
}
