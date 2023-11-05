import { Injectable } from '@nestjs/common';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizzesService {
  async findAll(): Promise<Quiz[]> {
    const quiz = new Quiz();
    quiz.id = 1;
    quiz.name = 'Test z matematyki';
    quiz.questions = ['2+2', '1+1'];
    return [quiz];
  }
}
