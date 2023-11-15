import { Question, QuestionType } from '../question.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity, Column } from 'typeorm';
import { PlainTextAnswerStudent } from './plainTextAnswer.student';
import { QuestionStudentInput } from '../question.student.input';
import { PlainTextAnswerStudentCheck } from './plainTextAnswer.student.check';
@ChildEntity(QuestionType.PLAIN)
@ObjectType({
  implements: Question,
})
export class PlainTextAnswer extends Question {
  @Column()
  @Field()
  correctAnswer: string;

  isCorrect = (
    answer: string | null = null,
    answers: string[] | null = null,
  ): boolean => {
    if (answer === null) return false;
    return (
      answer.toLowerCase().replaceAll('/s/g', '') ===
      this.correctAnswer.toLowerCase().replaceAll('/s/g', '')
    );
  };

  mapToStudent = (): PlainTextAnswerStudent => {
    const studentQuestion = new PlainTextAnswerStudent();
    studentQuestion.id = this.id;
    studentQuestion.task = this.task;
    return studentQuestion;
  };

  check = (answer: QuestionStudentInput): PlainTextAnswerStudentCheck => {
    const studentCheck = new PlainTextAnswerStudentCheck();
    studentCheck.id = this.id;
    studentCheck.task = this.task;
    studentCheck.correctAnswer = this.correctAnswer;
    studentCheck.studentAnswer = answer.answer;
    studentCheck.correct = this.isCorrect(answer.answer, answer.answers);
    return studentCheck;
  };
}
