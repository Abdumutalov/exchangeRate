import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RateModel {
    @Field()
    currency: string;

    @Field(() => Float)
    sell: number;

    @Field(() => Float)
    buy: number;
}

@ObjectType()
export class RateRecordModel {
    @Field()
    request_id: number;

    @Field(() => [RateModel])
    rates: RateModel[];
}