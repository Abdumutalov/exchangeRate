import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CurrencyModel {
  @Field()
  currency_code: string;

  @Field()
  character: string;

  @Field()
  currency_name: string;
}
