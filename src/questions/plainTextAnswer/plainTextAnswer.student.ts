import { QuestionStudent } from '../question.student';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  implements: QuestionStudent,
})
export class PlainTextAnswerStudent extends QuestionStudent {
  @Field()
  type: string = 'Plain Text Answer';
}
