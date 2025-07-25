import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RateModule } from './rate/rate.module';
import { BankModule } from './bank/bank.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    RateModule,
    BankModule,
    CurrencyModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
})
export class AppModule {}