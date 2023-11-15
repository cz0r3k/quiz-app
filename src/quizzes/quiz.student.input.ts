import { Field, InputType, Int } from '@nestjs/graphql';
import { QuestionStudentInput } from '../questions/question.student.input';

@InputType()
export class QuizStudentInput {
  @Field((type) => Int)
  id: number;

  @Field((type) => [QuestionStudentInput])
  questions: QuestionStudentInput[];
}
