import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

const BANKS_FILE = path.join(__dirname, '../../data/banks.json');

@Injectable()
export class BankService {
    async getAll() {
        const raw = await fs.readFile(BANKS_FILE, 'utf-8');
        return JSON.parse(raw);
    }
}
