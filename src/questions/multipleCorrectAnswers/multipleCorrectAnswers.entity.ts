import { Question, QuestionType, shuffle } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
import { MultipleCorrectAnswersStudent } from './multipleCorrectAnswers.student';

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
  isCorrect = (answer: string[]): boolean => {
    const x1 = answer.sort();
    const x2 = this.correctAnswers.sort();
    return (
      answer.length === this.correctAnswers.length &&
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
}
