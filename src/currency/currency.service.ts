import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

const FILE = path.join(__dirname, '../../data/currencies.json');

@Injectable()
export class CurrencyService {
  async getAll() {
    try {
      await fs.access(FILE);
    } catch {
      await fs.mkdir(path.dirname(FILE), { recursive: true });
      await fs.writeFile(FILE, '[]', 'utf-8');
    }

    const content = await fs.readFile(FILE, 'utf-8');
    return JSON.parse(content || '[]');
  }

  async getByCode(code: string) {
    const list = await this.getAll();
    return list.find((item) => item.currency === code);
  }

  async getByCharacter(symbol: string) {
    const list = await this.getAll();
    return list.find((item) => item.character === symbol);
  }
}
