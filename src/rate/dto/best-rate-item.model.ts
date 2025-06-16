import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BestRateItem {
    @Field()
    bank: string;

    @Field()
    rate_date: string;

    @Field()
    currency: string;

    @Field(() => Float)
    sell: number;

    @Field(() => Float)
    buy: number;

    @Field(() => Float)
    amount: number;

    @Field(() => Float)
    sellResult: number;

    @Field(() => Float)
    buyResult: number;
}
