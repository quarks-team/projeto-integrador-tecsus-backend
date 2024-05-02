import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Time } from '../entity/time.entity';
import { WatterBill } from '../entity/watter-bill.entity';
import { WatterBillPayload } from '../request/watter-bill-payload';

@Injectable()
export class IngestWatterBill {
  constructor(
    @InjectRepository(Time) private readonly timeRepo: Repository<Time>,
    @InjectRepository(WatterBill) private readonly billRepo: Repository<WatterBill>,
  ) {}

  async execute(watterBills: WatterBillPayload[]) {
    const times: Partial<Time>[] = [];
    const bills: Partial<WatterBill>[] = [];

    watterBills.forEach((bill) => {
      const [day, month, year] = bill['Conta do Mês'].split('/').map(Number);
      const billDate = new Date(year, month - 1, day);

      bills.push({
        rgiCode: bill['Código de Ligação (RGI)'],
        billDate: billDate,
        hidrometer: bill['Hidrômetro'].replace(/[-\/]/g, ''),
        watterConsume: parseFloat(bill['Consumo de Água m³'].replace(',', '')),
        wastePipeConsume: parseFloat(bill['Consumo de Esgoto m³'].replace(',', '')),
        watterValue: parseFloat(bill['Valor Água R$'].replace(',', '')),
        wastePipeValue: parseFloat(bill['Valor Esgoto R$'].replace(',', '')),
        total: parseFloat(bill['Total R$'].replace(',', '')),
        plant: bill.Planta,
      });

      times.push({
        month: month.toString(),
        year: year.toString(),
      });
    });

    await this.saveDistinctTimes(times);
    const savedBills = await this.billRepo.save(bills);
    return savedBills;
  }

  private async saveDistinctTimes(times: Partial<Time>[]) {
    const distinctTimes = this.getDistinctObjects(times);
    for (const time of distinctTimes) {
      const existsTime = await this.timeRepo.findOne({
        where: {
          month: time.month,
          year: time.year,
        },
      });
      if (!existsTime) {
        await this.timeRepo.save(time);
      }
    }
  }

  private getDistinctObjects(array: any[]) {
    return array.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.month === obj.month && t.year === obj.year),
    );
  }
}
