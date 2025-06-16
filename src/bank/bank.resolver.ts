import { Resolver, Query, Args } from '@nestjs/graphql';
import { BankService } from './bank.service';
import { BankModel } from './dto/bank.model';

@Resolver()
export class BankResolver {
    constructor(private readonly bankService: BankService) { }

    @Query(() => [BankModel])
    async getAllBanks() {
        return this.bankService.getAll();
    }
}
