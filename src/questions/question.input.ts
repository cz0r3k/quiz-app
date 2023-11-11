import { Field, InputType } from '@nestjs/graphql';

@InputType()
export abstract class QuestionInput {
  @Field()
  task: string;
}
