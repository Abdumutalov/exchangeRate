import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RateService } from './rate.service';
import { CreateRateInput } from './dto/create-rate.input';
import { BestRateResponse } from './dto/best-rate-response.model';

@Resolver()
export class RateResolver {
  constructor(private readonly rateService: RateService) {}

  @Mutation(() => Boolean)
  async setRates(@Args('input') input: CreateRateInput): Promise<boolean> {
    return this.rateService.create(input);
  }

  @Query(() => BestRateResponse)
  async getBestRateByCurrency(
    @Args('currency') currency: string,
  ): Promise<BestRateResponse> {
    return this.rateService.getBestRateByCurrency(currency);
  }
}