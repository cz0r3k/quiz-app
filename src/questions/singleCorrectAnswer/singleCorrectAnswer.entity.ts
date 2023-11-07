import { Question, QuestionType } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity(QuestionType.SINGLE)
@ObjectType({
  implements: Question,
})
export class SingleCorrectAnswer extends Question {
  @Column('text', { array: true })
  @Field((type) => [String])
  answers: string[];

  @Column()
  @Field()
  correctAnswer: string;

  isCorrect = (answer: string): boolean => this.correctAnswer == answer;
}
