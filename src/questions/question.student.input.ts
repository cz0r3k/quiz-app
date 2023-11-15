import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export abstract class QuestionStudentInput {
  @Field((type) => Int)
  id: number;

  @Field((type) => [String], { nullable: true })
  answers: string[];

  @Field((type) => String, { nullable: true })
  answer: string;
}
