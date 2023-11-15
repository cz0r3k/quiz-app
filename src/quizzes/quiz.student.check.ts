import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionStudentCheck } from '../questions/question.student.check';

@ObjectType()
export class QuizStudentCheck {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field((type) => Int)
  questionsNumber: number;

  @Field((type) => Int)
  answered: number;

  @Field((type) => Int)
  correct: number;

  @Field((type) => [QuestionStudentCheck])
  questions: QuestionStudentCheck[];
}
