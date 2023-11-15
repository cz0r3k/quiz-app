import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { QuizzesModule } from './quizzes/quizzes.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quizzes/quiz.entity';
import { MultipleCorrectAnswers } from './questions/multipleCorrectAnswers/multipleCorrectAnswers.entity';
import { PlainTextAnswer } from './questions/plainTextAnswer/plainTextAnswer.entity';
import { SingleCorrectAnswer } from './questions/singleCorrectAnswer/singleCorrectAnswer.entity';
import { Sorting } from './questions/sorting/sorting.entity';
import { Question } from './questions/question.entity';
import { MultipleCorrectAnswersInput } from './questions/multipleCorrectAnswers/multipleCorrectAnswers.input';
import { PlainTextAnswerInput } from './questions/plainTextAnswer/plainTextAnswer.input';
import { SingleCorrectAnswerInput } from './questions/singleCorrectAnswer/singleCorrectAnswer.input';
import { SortingInput } from './questions/sorting/sorting.input';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [
          MultipleCorrectAnswers,
          PlainTextAnswer,
          SingleCorrectAnswer,
          Sorting,
          MultipleCorrectAnswersInput,
          PlainTextAnswerInput,
          SingleCorrectAnswerInput,
          SortingInput,
        ],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      synchronize: true,
      logging: true,
      entities: [
        Quiz,
        Question,
        MultipleCorrectAnswers,
        PlainTextAnswer,
        SingleCorrectAnswer,
        Sorting,
      ],
      subscribers: [],
      migrations: [],
    }),
    QuizzesModule,
  ],
})
export class AppModule {}
