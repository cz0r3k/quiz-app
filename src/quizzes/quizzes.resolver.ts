import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './quiz.entity';
import { QuizInput } from './quiz.input';
import { Question } from '../questions/question.entity';

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

  @Query((returns) => Question)
  async question(
    @Args('quizId', { type: () => Int }) quizId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
  ): Promise<Question> {
    return (await this.quizzesService.findById(quizId)).getQuestionById(
      questionId,
    );
  }

  @Mutation((returns) => Quiz)
  async addQuiz(
    @Args('input', { type: () => QuizInput }) input: QuizInput,
  ): Promise<Quiz> {
    return this.quizzesService.addQuiz(input);
  }

  // @Mutation(returns => Quiz)
  // addQuestion(@Args('quizId', { type: () => Int }) quizId: number,
  //             @Args('question', {type: () => QuestionInput}) input: QuestionInput){
  //
  // }
}
