import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BankModel {
  @Field()
  BANK_CODE: string;

  @Field()
  BANK_NAME: string;

  @Field()
  BANK_ACTIVE: number;
}
