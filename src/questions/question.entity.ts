import { Field, Int, InterfaceType } from '@nestjs/graphql';
@InterfaceType()
export abstract class Question {
  @Field(type => Int)
  id: number;

  @Field()
  task: string;
  //isCorrect: (answer: any) => boolean;
}
