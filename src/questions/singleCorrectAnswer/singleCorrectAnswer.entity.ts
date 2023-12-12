import { Question, QuestionType, shuffle } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
import { SingleCorrectAnswerStudent } from './singleCorrectAnswer.student';
import { QuestionStudentInput } from '../question.student.input';
import { SingleCorrectAnswerStudentCheck } from './singleCorrectAnswer.student.check';

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

  isCorrect = (
    answer: string | null = null,
    answers: string[] | null = null,
  ): boolean => {
    if (answer === null) return false;
    return this.correctAnswer == answer;
  };

  mapToStudent = (): SingleCorrectAnswerStudent => {
    const studentQuestion = new SingleCorrectAnswerStudent();
    studentQuestion.id = this.id;
    studentQuestion.task = this.task;
    studentQuestion.answers = shuffle(this.answers);
    return studentQuestion;
  };

  check = (
    answer: QuestionStudentInput,
  ): SingleCorrectAnswerStudentCheck | null => {
    if (answer.answer == null) return null;
    const studentCheck = new SingleCorrectAnswerStudentCheck();
    studentCheck.id = this.id;
    studentCheck.task = this.task;
    studentCheck.answers = this.answers;
    studentCheck.correctAnswer = this.correctAnswer;
    studentCheck.studentAnswer = answer.answer;
    studentCheck.correct = this.isCorrect(answer.answer, answer.answers);
    return studentCheck;
  };
}
