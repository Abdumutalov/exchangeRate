import { Module, forwardRef } from '@nestjs/common';
import { RateResolver } from './rate.resolver';
import { RateService } from './rate.service';
import { BankModule } from '../bank/bank.module';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [forwardRef(() => BankModule), forwardRef(() => CurrencyModule)],
  providers: [RateResolver, RateService],
})
export class RateModule { }
