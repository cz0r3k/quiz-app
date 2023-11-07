import { Field, Int, InterfaceType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  TableInheritance,
} from 'typeorm';
import { Quiz } from '../quizzes/quiz.entity';

export enum QuestionType {
  MULTIPLE = 'multiple',
  PLAIN = 'plain',
  SINGLE = 'single',
  SORT = 'sort',
}

@Entity()
@TableInheritance({
  column: { type: 'enum', enum: QuestionType, name: 'type' },
})
@InterfaceType()
export abstract class Question {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  task: string;

  @ManyToOne((type) => Quiz)
  quiz: Quiz;

  @RelationId((question: Question) => question.quiz)
  quizId: number;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  abstract isCorrect: (answer: any) => boolean;
}
