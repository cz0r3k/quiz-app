import { Injectable } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { PlainTextAnswerInput } from '../questions/plainTextAnswer/plainTextAnswer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../questions/question.entity';
import { SingleCorrectAnswerInput } from '../questions/singleCorrectAnswer/singleCorrectAnswer.input';
import { QuizInput } from './quiz.input';
import { QuestionInput } from '../questions/question.input';
import { MultipleCorrectAnswersInput } from '../questions/multipleCorrectAnswers/multipleCorrectAnswers.input';
import { SortingInput } from '../questions/sorting/sorting.input';
import { QuizStudent } from "./quiz.student";
import { QuizStudentInput } from "./quiz.student.input";
import { QuizStudentCheck } from "./quiz.student.check";

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

    const question3 = new SortingInput();
    question3.task = 'posegreguj liczby';
    question3.correctAnswers = ['-1', '1/2', '2', 'e', 'pi'];

    const quiz = new QuizInput();

    quiz.name = 'Test z matematyki';
    quiz.questions = [question1, question2];

    const question4 = new MultipleCorrectAnswersInput();
    question4.task = 'Jakie liczby są niewymierne?';
    question4.answers = ['-1', '1/2', '2', 'e', 'pi'];
    question4.correctAnswers = ['e', 'pi'];

    const question5 = new SortingInput();
    question5.task = 'posegreguj liczby';
    question5.correctAnswers = ['-1', '0', '1'];

    this.addQuiz(quiz).then(() => {
      this.addQuestion(1, question3);
      this.addQuestions(1, [question4, question5]);
    });
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
