import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesResolver } from './quizzes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { MultipleCorrectAnswers } from '../questions/multipleCorrectAnswers/multipleCorrectAnswers.entity';
import { PlainTextAnswer } from '../questions/plainTextAnswer/plainTextAnswer.entity';
import { SingleCorrectAnswer } from '../questions/singleCorrectAnswer/singleCorrectAnswer.entity';
import { Sorting } from '../questions/sorting/sorting.entity';
import { Question } from '../questions/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz,
      Question,
      MultipleCorrectAnswers,
      PlainTextAnswer,
      SingleCorrectAnswer,
      Sorting,
    ]),
  ],
  providers: [QuizzesService, QuizzesResolver],
})
export class QuizzesModule {}
