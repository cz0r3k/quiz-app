import { Question, QuestionType } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
@ChildEntity(QuestionType.PLAIN)
@ObjectType({
  implements: Question,
})
export class PlainTextAnswer extends Question {
  @Column()
  @Field()
  correctAnswer: string;

  isCorrect = (answer: string): boolean =>
    answer.toLowerCase().replaceAll('/s/g', '') === this.correctAnswer;
}
