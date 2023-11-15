import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class QuestionStudentCheck {
  @Field((type) => Int)
  id: number;

  @Field()
  task: string;

  @Field(() => Boolean)
  correct: boolean;
}
