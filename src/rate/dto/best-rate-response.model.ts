// src/rate/dto/best-rate-response.model.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { BestRateSummary } from './best-rate-summary.model';

@ObjectType()
export class BestRateResponse {
  @Field()
  currency: string;

  @Field(() => [BestRateSummary])
  result: BestRateSummary[];
}
