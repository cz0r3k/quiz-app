import { Field, InputType } from '@nestjs/graphql';
import { QuestionInput } from '../question.input';
import { QuestionType } from '../question.entity';

@InputType()
export class SortingInput extends QuestionInput {
  @Field((type) => [String])
  correctAnswers: string[];

  type: QuestionType = QuestionType.SORT;
}
