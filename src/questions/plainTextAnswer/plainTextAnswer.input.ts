import { Field, InputType } from '@nestjs/graphql';
import { QuestionInput } from '../question.input';
import { QuestionType } from '../question.entity';

@InputType()
export class PlainTextAnswerInput extends QuestionInput {
  @Field()
  correctAnswer: string;

  type: QuestionType = QuestionType.PLAIN;
}
