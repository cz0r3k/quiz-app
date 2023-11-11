import { Question, QuestionType } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity(QuestionType.SORT)
@ObjectType({
  implements: Question,
})
export class Sorting extends Question {
  @Column('text', { array: true })
  @Field((type) => [String])
  correctAnswers: string[];

  isCorrect = (answer: [string]): boolean =>
    answer.length === this.correctAnswers.length &&
    answer.every((x, i) => x === this.correctAnswers[i]);
}
