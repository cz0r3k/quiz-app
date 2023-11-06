import { Question } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  implements: Question,
})
export class Sorting extends Question {
  @Field(type => [String])
  order: string[];

  isCorrect = (answer: [string]): boolean =>
    answer.length === this.order.length &&
    answer.every((x, i) => x === this.order[i])
}
