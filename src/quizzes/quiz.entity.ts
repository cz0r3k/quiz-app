import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '../questions/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuizStudent } from './quiz.student';
import { QuizStudentInput } from './quiz.student.input';
import { QuestionStudentCheck } from '../questions/question.student.check';
import { QuizStudentCheck } from './quiz.student.check';

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

  check = (input: QuizStudentInput): QuizStudentCheck | null => {
    const studentQuiz = new QuizStudentCheck();
    studentQuiz.id = this.id;
    studentQuiz.name = this.name;
    const questionCheck: QuestionStudentCheck[] = [];
    this.questions.forEach((question) => {
      const answer = input.questions.find((x) => question.id === x.id);
      if (answer) {
        questionCheck.push(question.check(answer));
      }
    });
    studentQuiz.questions = questionCheck;
    studentQuiz.questionsNumber = this.questions.length;
    studentQuiz.answered = questionCheck.length;
    studentQuiz.correct = questionCheck.filter((x) => x.correct).length;
    return studentQuiz;
  };
}
