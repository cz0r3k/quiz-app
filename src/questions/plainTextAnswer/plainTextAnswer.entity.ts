import { Question } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  implements: Question,
})
export class PlainTextAnswer extends Question {
  @Field()
  correctAnswer: string;

  isCorrect(answer: string): boolean {
    return answer.toLowerCase().replaceAll('/s/g', '') === this.correctAnswer;
  }
}
