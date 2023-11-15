import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionStudent } from '../questions/question.student';

@ObjectType()
export class QuizStudent {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field((type) => [QuestionStudent])
  questions: QuestionStudent[];
}
