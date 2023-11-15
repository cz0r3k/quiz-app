import { Field, ObjectType } from '@nestjs/graphql';
import { QuestionStudentCheck } from '../question.student.check';

@ObjectType({
  implements: QuestionStudentCheck,
})
export class SortingStudentCheck extends QuestionStudentCheck {
  @Field((type) => [String])
  studentAnswers: string[];

  @Field((type) => [String])
  correctAnswers: string[];
}
