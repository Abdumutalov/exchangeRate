import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BestRateSummary {
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
}