import { Injectable } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { PlainTextAnswer } from '../questions/plainTextAnswer/plainTextAnswer.entity';
import { SingleCorrectAnswer } from '../questions/singleCorrectAnswer/singleCorrectAnswer.entity';

@Injectable()
export class QuizzesService {
  private readonly quizzes: Quiz[] = [];

  constructor() {
    const question1 = new PlainTextAnswer();
    question1.id = 1;
    question1.task = '2+2';
    question1.correctAnswer = '4';

    const question2 = new SingleCorrectAnswer();
    question2.id = 2;
    question2.task = '2+2*2';
    question2.answers = ['6', '8'];
    question2.correctAnswer = '6';

    const quiz = new Quiz();
    quiz.id = 1;
    quiz.name = 'Test z matematyki';
    quiz.questions = [question1, question2];

    this.quizzes.push(quiz);
  }
  async findAll(): Promise<Quiz[]> {
    return this.quizzes;
  }

  async findById(id: number): Promise<Quiz> {
    return this.quizzes.find((x) => x.id == id);
  }

  async addQuiz(quiz: Quiz): Promise<void> {
    this.quizzes.push(quiz);
  }
  getId(): number {
    return this.quizzes.length + 1;
  }
}
