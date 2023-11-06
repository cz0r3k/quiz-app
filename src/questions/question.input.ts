import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QuestionInput {
  @Field()
  task: string;
}
