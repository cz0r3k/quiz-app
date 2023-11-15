import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './quiz.entity';
import { QuizInput } from './quiz.input';
import {
  mapInput,
  QuestionConcreteInput,
} from '../questions/questionConcreteInput';
import { QuizStudent } from './quiz.student';
import { QuizStudentInput } from './quiz.student.input';
import { QuizStudentCheck } from './quiz.student.check';

@Resolver((of) => Quiz)
export class QuizzesResolver {
  constructor(private quizzesService: QuizzesService) {}

  @Query((returns) => [Quiz])
  async quizzes(): Promise<Quiz[]> {
    return this.quizzesService.findAll();
  }

  @Query((returns) => Quiz)
  async quiz(@Args('id', { type: () => Int }) id: number): Promise<Quiz> {
    return this.quizzesService.findById(id);
  }

  @Mutation((returns) => Quiz)
  async addQuiz(
    @Args('input', { type: () => QuizInput }) input: QuizInput,
  ): Promise<Quiz> {
    return this.quizzesService.addQuiz(input);
  }

  @Mutation((returns) => Quiz)
  async addQuestion(
    @Args('quizId', { type: () => Int }) quizId: number,
    @Args('question', { type: () => QuestionConcreteInput })
    input: QuestionConcreteInput,
  ): Promise<Quiz> {
    return this.quizzesService.addQuestion(quizId, mapInput(input));
  }
  @Mutation((returns) => Quiz)
  async addQuestions(
    @Args('quizId', { type: () => Int }) quizId: number,
    @Args('questions', { type: () => [QuestionConcreteInput] })
    input: QuestionConcreteInput[],
  ): Promise<Quiz> {
    return this.quizzesService.addQuestions(
      quizId,
      input.map((x) => {
        return mapInput(x);
      }),
    );
  }
  @Query((returns) => QuizStudent)
  async quizStudent(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<QuizStudent> {
    return this.quizzesService.getQuizStudent(id);
  }

  @Query((returns) => QuizStudentCheck)
  async answer(
    @Args('id', { type: () => Int }) id: number,
    @Args('quiz', { type: () => QuizStudentInput })
    input: QuizStudentInput,
  ): Promise<QuizStudent> {
    return this.quizzesService.answerQuizStudent(id, input);
  }
}
