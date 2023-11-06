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
  async quiz(@Args('id', { type: () => Int }) id: number) {
    return this.quizzesService.findById(id);
  }

  @Query((returns) => Question)
  async question(
    @Args('quizId', { type: () => Int }) quizId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
  ) {
    return (await this.quizzesService.findById(quizId)).getQuestionById(
      questionId,
    );
  }

  @Mutation((returns) => Quiz)
  addQuiz(@Args('input', { type: () => QuizInput }) input: QuizInput): Quiz {
    const quiz = Object.assign(new Quiz(), {
      id: this.quizzesService.getId(),
      name: input.name,
      questions: <Question[]>[],
    });
    this.quizzesService.addQuiz(quiz);
    return quiz;
  }

  // @Mutation(returns => Quiz)
  // addQuestion(@Args('quizId', { type: () => Int }) quizId: number,
  //             @Args('question', {type: () => QuestionInput}) input: QuestionInput){
  //
  // }
}
