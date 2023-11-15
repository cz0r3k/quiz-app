import { Field, InputType } from '@nestjs/graphql';
import { QuestionConcreteInput } from '../questions/questionConcreteInput';

@InputType()
export class QuizInput {
  @Field()
  name: string;
  @Field((type) => [QuestionConcreteInput], { nullable: true })
  questions?: QuestionConcreteInput[];
}
