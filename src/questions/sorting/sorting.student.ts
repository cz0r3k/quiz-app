import { Field, ObjectType } from '@nestjs/graphql';
import { QuestionStudent } from '../question.student';

@ObjectType({
  implements: QuestionStudent,
})
export class SortingStudent extends QuestionStudent {
  @Field((type) => [String])
  answers: string[];

  @Field()
  type: string = 'Sorting';
}
