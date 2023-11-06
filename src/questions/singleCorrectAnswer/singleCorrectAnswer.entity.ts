import { Question } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  implements: Question,
})
export class SingleCorrectAnswer extends Question {
  @Field(type => [String])
  answers: string[];
  @Field()
  correctAnswer: string;

  isCorrect(answer: string): boolean {
    return this.correctAnswer == answer;
  }
}
