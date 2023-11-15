import { Question, QuestionType, shuffle } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
import { SortingStudent } from './sorting.student';

@ChildEntity(QuestionType.SORT)
@ObjectType({
  implements: Question,
})
export class Sorting extends Question {
  @Column('text', { array: true })
  @Field((type) => [String])
  correctAnswers: string[];

  isCorrect = (answer: string[]): boolean =>
    answer.length === this.correctAnswers.length &&
    answer.every((x, i) => x === this.correctAnswers[i]);

  mapToStudent = (): SortingStudent => {
    const studentQuestion = new SortingStudent();
    studentQuestion.id = this.id;
    studentQuestion.task = this.task;
    studentQuestion.answers = shuffle(this.correctAnswers);
    return studentQuestion;
  };
}
