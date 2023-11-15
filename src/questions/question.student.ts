import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class QuestionStudent {
  @Field((type) => Int)
  id: number;

  @Field()
  task: string;
}
