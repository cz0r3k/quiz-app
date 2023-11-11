import { Question, QuestionType } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity(QuestionType.MULTIPLE)
@ObjectType({
  implements: Question,
})
export class MultipleCorrectAnswers extends Question {
  @Column('text', { array: true })
  @Field((type) => [String])
  answers: string[];
  @Column('text', { array: true })
  @Field((type) => [String])
  correctAnswers: string[];
  isCorrect = (answer: string[]): boolean => {
    const x1 = answer.sort();
    const x2 = this.correctAnswers.sort();
    return (
      answer.length === this.correctAnswers.length &&
      x1.every((x, i) => x === x2[i])
    );
  };
}
