import { Injectable } from '@nestjs/common';
import { CreateRateInput } from './dto/create-rate.input';
import { promises as fs } from 'fs';
import * as path from 'path';
import { BestRateResponse } from './dto/best-rate-response.model';
import { BestRateSummary } from './dto/best-rate-summary.model';

const RATES_FILE = path.join(__dirname, '../../data/rates.json');
const CURRENCIES_FILE = path.join(__dirname, '../../data/currencies.json');
const BANKS_FILE = path.join(__dirname, '../../data/banks.json');

@Injectable()
export class RateService {
  // Method to validate the currency
  private async isValidCurrency(currency: string): Promise<boolean> {
    const currenciesData = await this.readCurrenciesFromFile();
    const normalizedCurrency = currency.trim().toUpperCase();

    // Check if the currency exists in the currencies.json array (based on the "currency" key)
    return currenciesData.some((entry) => entry.currency.toUpperCase() === normalizedCurrency);
  }

  // Method to validate the bank code
  private async isValidBank(bankCode: string): Promise<boolean> {
    const banksData = await this.readBanksFromFile();
    const normalizedBankCode = bankCode.trim().toUpperCase();

    // Check if the bank exists in the banks.json array (based on the "BANK_CODE" key)
    return banksData.some((entry) => entry.BANK_CODE.toUpperCase() === normalizedBankCode);
  }

  // Create rate method with currency and bank validation
  async create(input: CreateRateInput): Promise<boolean> {
    // Validate currency codes in the input
    for (const rate of input.rates) {
      const isCurrencyValid = await this.isValidCurrency(rate.currency);
      if (!isCurrencyValid) {
        throw new Error(`Invalid currency '${rate.currency}'`);
      }
    }

    // Validate the bank code in the input
    const isBankValid = await this.isValidBank(input.bank);
    if (!isBankValid) {
      throw new Error(`Invalid bank code '${input.bank}'`);
    }

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
      await fs.access(RATES_FILE);
    } catch {
      await fs.mkdir(path.dirname(RATES_FILE), { recursive: true });
      await fs.writeFile(RATES_FILE, '[]', 'utf-8');
    }

    const content = await fs.readFile(RATES_FILE, 'utf-8');
    return JSON.parse(content);
  }

  private async writeToFile(data: CreateRateInput[]) {
    await fs.writeFile(RATES_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  // Helper method to read currencies from currencies.json file
  private async readCurrenciesFromFile(): Promise<{ currency: string; character: string }[]> {
    try {
      await fs.access(CURRENCIES_FILE);
    } catch (err) {
      console.error("Error reading currencies file:", err);
      return [];
    }

    const content = await fs.readFile(CURRENCIES_FILE, 'utf-8');
    return JSON.parse(content);
  }

  // Helper method to read banks from banks.json file
  private async readBanksFromFile(): Promise<{ BANK_CODE: string; BANK_NAME: string; BANK_ACTIVE: number }[]> {
    try {
      await fs.access(BANKS_FILE);
    } catch (err) {
      console.error("Error reading banks file:", err);
      return [];
    }

    const content = await fs.readFile(BANKS_FILE, 'utf-8');
    return JSON.parse(content);
  }
}
