import { Injectable } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { PlainTextAnswer } from '../questions/plainTextAnswer/plainTextAnswer.entity';

@Injectable()
export class QuizzesService {
  async findAll(): Promise<Quiz[]> {
    const question = new PlainTextAnswer();
    question.id = 1;
    question.task = '2+2';
    question.correctAnswer = '4';
    const quiz = new Quiz();
    quiz.id = 1;
    quiz.name = 'Test z matematyki';
    quiz.questions = [question];
    return [quiz];
  }
}
