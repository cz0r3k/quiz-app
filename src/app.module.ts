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
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [
          MultipleCorrectAnswers,
          PlainTextAnswer,
          SingleCorrectAnswer,
          Sorting,
        ],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: parseInt(process.env.PORT_DB, 10),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_DB,
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
