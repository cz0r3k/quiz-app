import { Field, InputType } from '@nestjs/graphql';
import { QuestionInput } from '../question.input';
import { QuestionType } from '../question.entity';

@InputType()
export class SingleCorrectAnswerInput extends QuestionInput {
  @Field((type) => [String])
  answers: string[];
  @Field()
  correctAnswer: string;

  type: QuestionType = QuestionType.SINGLE;
}
