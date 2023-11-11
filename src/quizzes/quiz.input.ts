import { Field, InputType } from '@nestjs/graphql';
import { QuestionInput } from '../questions/question.input';
import { QuestionConcreteInput } from '../questions/questionConcreteInput';

@InputType()
export class QuizInput {
  @Field()
  name: string;
  @Field((type) => [QuestionInput], { nullable: true })
  questions?: QuestionConcreteInput[];
}
