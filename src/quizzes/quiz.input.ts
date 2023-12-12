import { Field, InputType } from '@nestjs/graphql';
import {
  mapInput,
  QuestionConcreteInput,
} from '../questions/questionConcreteInput';
import { Quiz } from './quiz.entity';
import { Question } from '../questions/question.entity';

@InputType()
export class QuizInput {
  @Field()
  name: string;
  @Field((type) => [QuestionConcreteInput], { nullable: true })
  questions?: QuestionConcreteInput[];
}

export function mapToQuiz(input: QuizInput): Quiz {
  const quiz = new Quiz();
  quiz.name = input.name;
  quiz.questions = input.questions
    .map((x: QuestionConcreteInput) => {
      return mapInput(x);
    })
    .filter((x: Question | null): x is Question => Boolean(x));
  return quiz;
}
