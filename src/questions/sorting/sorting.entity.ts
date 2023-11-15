import { Question, QuestionType, shuffle } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
import { SortingStudent } from './sorting.student';
import { QuestionStudentInput } from '../question.student.input';
import { SortingStudentCheck } from './sorting.student.check';

@ChildEntity(QuestionType.SORT)
@ObjectType({
  implements: Question,
})
export class Sorting extends Question {
  @Column('text', { array: true })
  @Field((type) => [String])
  correctAnswers: string[];

  isCorrect = (
    answer: string | null = null,
    answers: string[] | null = null,
  ): boolean => {
    if (answers === null) return false;
    return (
      answers.length === this.correctAnswers.length &&
      answers.every((x, i) => x === this.correctAnswers[i])
    );
  };
  mapToStudent = (): SortingStudent => {
    const studentQuestion = new SortingStudent();
    studentQuestion.id = this.id;
    studentQuestion.task = this.task;
    studentQuestion.answers = shuffle(this.correctAnswers);
    return studentQuestion;
  };

  check = (answer: QuestionStudentInput): SortingStudentCheck => {
    const studentCheck = new SortingStudentCheck();
    studentCheck.id = this.id;
    studentCheck.task = this.task;
    studentCheck.correctAnswers = this.correctAnswers;
    studentCheck.studentAnswers = answer.answers;
    studentCheck.correct = this.isCorrect(answer.answer, answer.answers);
    return studentCheck;
  };
}
