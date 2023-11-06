import { Field, InputType } from '@nestjs/graphql';
import { QuestionInput } from '../question.input';

@InputType()
export class PlainTextAnswerInput extends QuestionInput {
  @Field()
  correctAnswer: string;
}
