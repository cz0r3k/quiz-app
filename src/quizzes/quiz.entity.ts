import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '../questions/question.entity';

@ObjectType()
export class Quiz {
  @Field(type => Int)
  id: number;
  @Field()
  name: string;
  @Field(type => [Question])
  questions: Question[];

  async getQuestionById(id: number): Promise<Question> {
    return this.questions.find((x) => x.id == id);
  }
}
