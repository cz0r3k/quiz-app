import { QuestionStudent } from '../question.student';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  implements: QuestionStudent,
})
export class SingleCorrectAnswerStudent extends QuestionStudent {
  @Field((type) => [String])
  answers: string[];

  @Field()
  type: string = 'Single Correct Answer';
}
