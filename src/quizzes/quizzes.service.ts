import { Injectable } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { PlainTextAnswerInput } from '../questions/plainTextAnswer/plainTextAnswer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../questions/question.entity';
import { SingleCorrectAnswerInput } from '../questions/singleCorrectAnswer/singleCorrectAnswer.input';
import { QuizInput } from './quiz.input';
import { Sorting } from '../questions/sorting/sorting.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizzesRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {
    const question1 = new PlainTextAnswerInput();
    question1.task = '2+2';
    question1.correctAnswer = '4';

    const question2 = new SingleCorrectAnswerInput();
    question2.task = '2+2*2';
    question2.answers = ['6', '8'];
    question2.correctAnswer = '6';

    const question3 = new Sorting();
    question3.task = 'posegreguj liczby';
    question3.order = ['-1', '1/2', '2', 'e', 'pi'];

    const quiz = new QuizInput();

    quiz.name = 'Test z matematyki';
    quiz.questions = [question1, question2, question3];

    this.addQuiz(quiz);
  }
  async findAll(): Promise<Quiz[]> {
    return this.quizzesRepository.find({
      relations: {
        questions: true,
      },
    });
  }

  async findById(id: number): Promise<Quiz | null> {
    return this.quizzesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        questions: true,
      },
    });
  }
  async addQuiz(quiz: QuizInput): Promise<Quiz> {
    if (quiz.questions === null) {
      quiz.questions = [];
    } else {
      const promise = [];
      quiz.questions.forEach((question) => {
        promise.push(this.questionsRepository.save(question));
      });
      await Promise.all(promise);
    }
    return this.quizzesRepository.save(quiz);
  }
}
