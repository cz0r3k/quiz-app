import { Field, ObjectType } from '@nestjs/graphql';
import { QuestionStudentCheck } from '../question.student.check';

@ObjectType({
  implements: QuestionStudentCheck,
})
export class SingleCorrectAnswerStudentCheck extends QuestionStudentCheck {
  @Field((type) => [String])
  answers: string[];

  @Field((type) => String)
  studentAnswer: string;

  @Field((type) => String)
  correctAnswer: string;
}
