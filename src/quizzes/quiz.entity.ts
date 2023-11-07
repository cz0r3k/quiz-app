import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '../questions/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Quiz {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany((type) => Question, (question) => question.quiz)
  @Field((type) => [Question])
  questions: Question[];

  async getQuestionById(id: number): Promise<Question> {
    return this.questions.find((x) => x.id == id);
  }
}
