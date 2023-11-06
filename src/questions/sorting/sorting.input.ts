import { Field, InputType } from '@nestjs/graphql';
import { QuestionInput } from '../question.input';

@InputType()
export class SortingInput extends QuestionInput {
  @Field((type) => [String])
  order: string[];
}
