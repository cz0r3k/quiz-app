import { Injectable } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../questions/question.entity';
import { QuizInput } from './quiz.input';
import { QuestionInput } from '../questions/question.input';
import { QuizStudent } from './quiz.student';
import { QuizStudentInput } from './quiz.student.input';
import { QuizStudentCheck } from './quiz.student.check';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizzesRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}
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
    quiz.questions = [];
    return this.quizzesRepository.save(quiz);
  }

  async addQuestion(
    quizId: number,
    questionInput: QuestionInput,
  ): Promise<Quiz> {
    const question = await this.questionsRepository.save(questionInput);
    await this.questionsRepository
      .createQueryBuilder()
      .relation(Quiz, 'questions')
      .of(quizId)
      .add(question.id);
    return this.findById(quizId);
  }

  async addQuestions(
    quizId: number,
    questionInputs: QuestionInput[],
  ): Promise<Quiz> {
    const questions = await this.questionsRepository.save(questionInputs);
    await this.questionsRepository
      .createQueryBuilder()
      .relation(Quiz, 'questions')
      .of(quizId)
      .add(
        questions.map((x) => {
          return x.id;
        }),
      );
    return this.findById(quizId);
  }

  async getQuizStudent(id: number): Promise<QuizStudent | null> {
    const quiz = await this.quizzesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        questions: true,
      },
    });
    return quiz.mapToStudent();
  }

  async answerQuizStudent(
    id: number,
    input: QuizStudentInput,
  ): Promise<QuizStudentCheck> {
    const quiz = await this.quizzesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        questions: true,
      },
    });
    return quiz.check(input);
  }
}
