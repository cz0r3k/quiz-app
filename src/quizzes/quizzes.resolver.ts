import { Query, Resolver } from '@nestjs/graphql';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './quiz.entity';

@Resolver(of => Quiz)
export class QuizzesResolver {
  constructor(private quizzesService: QuizzesService) {}

  @Query(returns => [Quiz])
  quizzes(): Promise<Quiz[]> {
    return this.quizzesService.findAll();
  }
}
