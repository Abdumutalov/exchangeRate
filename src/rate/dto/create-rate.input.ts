import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class RateInput {
  @Field()
  currency: string;

  @Field(() => Float)
  sell: number;

  @Field(() => Float)
  buy: number;
}

@InputType()
export class CreateRateInput {
  @Field()
  bank: string;

  @Field()
  rate_date: string;

  @Field(() => [RateInput])
  rates: RateInput[];
}
