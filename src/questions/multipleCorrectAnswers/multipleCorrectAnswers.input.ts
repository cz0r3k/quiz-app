import { QuestionInput } from '../question.input';
import { Field, InputType } from '@nestjs/graphql';
import { QuestionType } from '../question.entity';

@InputType()
export class MultipleCorrectAnswersInput extends QuestionInput {
  @Field((type) => [String])
  answers: string[];
  @Field((type) => [String])
  correctAnswers: string[];

  type: QuestionType = QuestionType.MULTIPLE;
}
