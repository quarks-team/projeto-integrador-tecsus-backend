import { Injectable } from '@nestjs/common';
import { EnergyBill } from '../entity/energy-bill.entity';
import { WatterBill } from '../entity/watter-bill.entity';
import { Time } from '../entity/time.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MergeAndFilterBills {
  constructor(
    @InjectRepository(Time) private readonly timeRepo: Repository<Time>,
    @InjectRepository(EnergyBill) private readonly energyBillRepo: Repository<EnergyBill>,
    @InjectRepository(WatterBill) private readonly watterBillRepo: Repository<WatterBill>,
  ) {}

  async execute(proAguaCsv: WatterBill[], proEnergiaCsv: EnergyBill[]) {
    // Merge the 'Conta do Mês' columns from both datasets
    const mergedDates = [...proAguaCsv.map((entry) => entry['Conta do Mês']), ...proEnergiaCsv.map((entry) => entry['Conta do Mês'])];

    // Convert dates to datetime format if they aren't already
    const mergedDatesSorted = mergedDates.map((dateStr) => new Date(dateStr)).sort((a, b) => a.getTime() - b.getTime());

    // Remove duplicates
    const mergedDatesUnique = mergedDatesSorted.filter((date, index, self) => self.indexOf(date) === index);

    // Filter bills where 'Conta do Mês' is in mergedDatesUnique
    const filteredWatterBills = proAguaCsv.filter((entry) => mergedDatesUnique.includes(entry['Conta do Mês']));
    const filteredEnergyBills = proEnergiaCsv.filter((entry) => mergedDatesUnique.includes(entry['Conta do Mês']));

    // Further processing if needed...

    return { filteredWatterBills, filteredEnergyBills };
  }
}
