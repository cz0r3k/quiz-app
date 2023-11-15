import { Question, QuestionType, shuffle } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
import { MultipleCorrectAnswersStudent } from './multipleCorrectAnswers.student';
import { QuestionStudentInput } from '../question.student.input';
import { MultipleCorrectAnswersStudentCheck } from './multipleCorrectAnswers.student.check';

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
  isCorrect = (
    answer: string | null = null,
    answers: string[] | null = null,
  ): boolean => {
    if (answers === null) return false;
    const x1 = answers.sort();
    const x2 = this.correctAnswers.sort();
    return (
      answers.length === this.correctAnswers.length &&
      x1.every((x, i) => x === x2[i])
    );
  };

  mapToStudent = (): MultipleCorrectAnswersStudent => {
    const studentQuestion = new MultipleCorrectAnswersStudent();
    studentQuestion.id = this.id;
    studentQuestion.task = this.task;
    studentQuestion.answers = shuffle(this.answers);
    return studentQuestion;
  };

  check = (
    answer: QuestionStudentInput,
  ): MultipleCorrectAnswersStudentCheck => {
    const studentCheck = new MultipleCorrectAnswersStudentCheck();
    studentCheck.id = this.id;
    studentCheck.task = this.task;
    studentCheck.answers = this.answers;
    studentCheck.correctAnswers = this.correctAnswers;
    studentCheck.studentAnswers = answer.answers;
    studentCheck.correct = this.isCorrect(answer.answer, answer.answers);
    return studentCheck;
  };
}
