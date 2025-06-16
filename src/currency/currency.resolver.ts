import { Resolver, Query, Args } from '@nestjs/graphql';
import { CurrencyService } from './currency.service';
import { CurrencyModel } from './dto/currency.model';

@Resolver()
export class CurrencyResolver {
    constructor(private readonly currencyService: CurrencyService) { }

    @Query(() => [CurrencyModel])
    async getAllCurrencies() {
        return this.currencyService.getAll();
    }
}
