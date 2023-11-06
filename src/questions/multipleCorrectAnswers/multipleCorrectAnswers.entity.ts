import { Question } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  implements: Question,
})
export class MultipleCorrectAnswers extends Question {
  @Field()
  answers: string;
  @Field(type => [String])
  correctAnswers: string[];
  isCorrect(answer: string[]): boolean {
    const x1 = answer.sort();
    const x2 = this.correctAnswers.sort();
    return (
      answer.length === this.correctAnswers.length &&
      x1.every((x, i) => x === x2[i])
    );
  }
}
