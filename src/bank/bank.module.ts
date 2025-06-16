import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankResolver } from './bank.resolver';

@Module({
  providers: [BankService, BankResolver],
  exports: [BankService]  
})
export class BankModule {}
