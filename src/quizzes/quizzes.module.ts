import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesResolver } from './quizzes.resolver';

@Module({
  providers: [QuizzesService, QuizzesResolver],
})
export class QuizzesModule {}
