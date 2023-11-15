import { Field, ObjectType } from '@nestjs/graphql';
import { QuestionStudentCheck } from '../question.student.check';

@ObjectType({
  implements: QuestionStudentCheck,
})
export class MultipleCorrectAnswersStudentCheck extends QuestionStudentCheck {
  @Field((type) => [String])
  answers: string[];

  @Field((type) => [String])
  studentAnswers: string[];

  @Field((type) => [String])
  correctAnswers: string[];
}
