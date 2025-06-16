import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyResolver } from './currency.resolver';

@Module({
    providers: [CurrencyService, CurrencyResolver],
    exports: [CurrencyService]
})
export class CurrencyModule { }
