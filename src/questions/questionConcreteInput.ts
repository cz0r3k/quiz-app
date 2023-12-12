import { Field, InputType } from '@nestjs/graphql';
import { QuestionInput } from './question.input';
import { Question } from './question.entity';
import { PlainTextAnswer } from './plainTextAnswer/plainTextAnswer.entity';
import { MultipleCorrectAnswers } from './multipleCorrectAnswers/multipleCorrectAnswers.entity';
import { SingleCorrectAnswer } from './singleCorrectAnswer/singleCorrectAnswer.entity';
import { Sorting } from './sorting/sorting.entity';

@InputType()
export class QuestionConcreteInput extends QuestionInput {
  @Field((type) => [String], { nullable: true })
  answers?: string[];
  @Field((type) => [String], { nullable: true })
  correctAnswers?: string[];
  @Field((type) => String, { nullable: true })
  answer?: string;
  @Field((type) => String, { nullable: true })
  correctAnswer?: string;
}

function toMultiple(input: QuestionConcreteInput): MultipleCorrectAnswers {
  const multiple: MultipleCorrectAnswers = new MultipleCorrectAnswers();
  multiple.answers = input.answers;
  multiple.correctAnswers = input.correctAnswers;
  multiple.task = input.task;
  return multiple;
}
function toSingle(input: QuestionConcreteInput): SingleCorrectAnswer {
  const single: SingleCorrectAnswer = new SingleCorrectAnswer();
  single.answers = input.answers;
  single.correctAnswer = input.correctAnswer;
  single.task = input.task;
  return single;
}

function toSorting(input: QuestionConcreteInput): Sorting {
  const sorting: Sorting = new Sorting();
  sorting.correctAnswers = input.correctAnswers;
  sorting.task = input.task;
  return sorting;
}

function toPlain(input: QuestionConcreteInput): PlainTextAnswer {
  const plain: PlainTextAnswer = new PlainTextAnswer();
  plain.correctAnswer = input.correctAnswer;
  plain.task = input.task;
  return plain;
}

export function mapInput(input: QuestionConcreteInput): Question | null {
  switch (true) {
    case 'answers' in input && 'correctAnswers' in input:
      return toMultiple(input);
    case 'answers' in input && 'correctAnswer' in input:
      return toSingle(input);
    case 'correctAnswer' in input:
      return toPlain(input);
    case 'correctAnswers' in input:
      return toSorting(input);
    default:
      return null;
  }
}
