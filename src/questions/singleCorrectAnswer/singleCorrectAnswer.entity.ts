import { Question, QuestionType, shuffle } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
import { SingleCorrectAnswerStudent } from './singleCorrectAnswer.student';

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

  mapToStudent = (): SingleCorrectAnswerStudent => {
    const studentQuestion = new SingleCorrectAnswerStudent();
    studentQuestion.id = this.id;
    studentQuestion.task = this.task;
    studentQuestion.answers = shuffle(this.answers);
    return studentQuestion;
  };
}
