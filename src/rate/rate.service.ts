import { Injectable } from '@nestjs/common';
import { CreateRateInput } from './dto/create-rate.input';
import { promises as fs } from 'fs';
import * as path from 'path';
import { BestRateResponse } from './dto/best-rate-response.model';
import { BestRateSummary } from './dto/best-rate-summary.model';


const DATA_FILE = path.join(__dirname, '../../data/rates.json');

@Injectable()
export class RateService {
  async create(input: CreateRateInput): Promise<boolean> {
    const data = await this.readFromFile();
    const existingIndex = data.findIndex(
      (r) => r.bank === input.bank && r.rate_date === input.rate_date
    );

    if (existingIndex >= 0) {
      data[existingIndex] = input;
    } else {
      data.push(input);
    }

    await this.writeToFile(data);
    return true;
  }

  async findByBankAndDate(bank: string, rate_date: string) {
    const data = await this.readFromFile();
    return data.find((r) => r.bank === bank && r.rate_date === rate_date);
  }

  async getAll() {
    return this.readFromFile();
  }

  async getBestRateByCurrency(currency: string): Promise<BestRateResponse> {
    const data = await this.readFromFile();

    const relevant = data.flatMap((rec) =>
      rec.rates
        .filter((r) => r.currency === currency)
        .map((r) => ({
          bank: rec.bank,
          rate_date: rec.rate_date,
          currency: r.currency,
          sell: r.sell,
          buy: r.buy,
        }))
    );

    if (relevant.length === 0) {
      throw new Error(`No rates found for currency '${currency}'`);
    }

    // Сортировка по убыванию курса покупки (выгодная продажа)
    relevant.sort((a, b) => b.buy - a.buy);

    return {
      currency,
      result: relevant,
    };
  }

  private async readFromFile(): Promise<CreateRateInput[]> {
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, '[]', 'utf-8');
    }

    const content = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  }

  private async writeToFile(data: CreateRateInput[]) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }
}