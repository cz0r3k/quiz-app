import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '../questions/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuizStudent } from './quiz.student';

@Entity()
@ObjectType()
export class Quiz {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany((type) => Question, (question) => question.quiz)
  @Field((type) => [Question])
  questions: Question[];

  mapToStudent = (): QuizStudent => {
    const studentQuiz = new QuizStudent();
    studentQuiz.id = this.id;
    studentQuiz.name = this.name;
    studentQuiz.questions = this.questions.map((question) => {
      return question.mapToStudent();
    });
    return studentQuiz;
  };
}
