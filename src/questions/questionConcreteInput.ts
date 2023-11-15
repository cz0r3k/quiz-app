import { Field, InputType } from '@nestjs/graphql';
import { MultipleCorrectAnswersInput } from './multipleCorrectAnswers/multipleCorrectAnswers.input';
import { PlainTextAnswerInput } from './plainTextAnswer/plainTextAnswer.input';
import { SingleCorrectAnswerInput } from './singleCorrectAnswer/singleCorrectAnswer.input';
import { SortingInput } from './sorting/sorting.input';
import { QuestionInput } from './question.input';

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

function toMultiple(input: QuestionConcreteInput): MultipleCorrectAnswersInput {
  const multiple: MultipleCorrectAnswersInput =
    new MultipleCorrectAnswersInput();
  multiple.answers = input.answers;
  multiple.correctAnswers = input.correctAnswers;
  multiple.task = input.task;
  return multiple;
}
function toSingle(input: QuestionConcreteInput): SingleCorrectAnswerInput {
  const single: SingleCorrectAnswerInput = new SingleCorrectAnswerInput();
  single.answers = input.answers;
  single.correctAnswer = input.correctAnswer;
  single.task = input.task;
  return single;
}

function toSorting(input: QuestionConcreteInput): SortingInput {
  const sorting: SortingInput = new SortingInput();
  sorting.correctAnswers = input.correctAnswers;
  sorting.task = input.task;
  return sorting;
}

function toPlain(input: QuestionConcreteInput): PlainTextAnswerInput {
  const plain: PlainTextAnswerInput = new PlainTextAnswerInput();
  plain.correctAnswer = input.correctAnswer;
  plain.task = input.task;
  return plain;
}

export function mapInput(input: QuestionConcreteInput): QuestionInput {
  switch (true) {
    case 'answers' in input && 'correctAnswers' in input:
      return toMultiple(input);
    case 'answers' in input && 'correctAnswer' in input:
      return toSingle(input);
    case 'correctAnswer' in input:
      return toPlain(input);
    case 'correctAnswers' in input:
      return toSorting(input);
  }
}
