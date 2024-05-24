import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Time } from '../entity/time.entity';
import { WatterBill } from '../entity/watter-bill.entity';
import { WatterBillPayload } from '../request/watter-bill-payload';

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
        hidrometer: bill.Hidrômetro,
        watterConsume: Number.parseFloat(
          bill['Consumo de Água m³'].replace(',', ''),
        ),
        wastePipeConsume: Number.parseFloat(
          bill['Consumo de Esgoto m³'].replace(',', ''),
        ),
        watterValue: Number.parseFloat(bill['Valor Água R$'].replace(',', '')),
        wastePipeValue: Number.parseFloat(
          bill['Valor Esgoto R$'].replace(',', ''),
        ),
        total: Number.parseFloat(bill['Total R$'].replace(',', '')),
        plant: bill.Planta,
        provider: "null"
      });

      times.push({
        month: month.toString(),
        year: year.toString(),
      });
    });

    try {
      const distinctTimes = this.getDistinctObjects(times);
      const existingTimes = await this.timeRepo.find({
        where: {
          month: In(distinctTimes.map(time => time.month)),
          year: In(distinctTimes.map(time => time.year)),
        },
      });

      const existingTimeMap = new Set(existingTimes.map(time => `${time.month}-${time.year}`));
      const newTimes = distinctTimes.filter(time => !existingTimeMap.has(`${time.month}-${time.year}`));

      await this.timeRepo.save(newTimes);
    } catch (error) {
      console.error('Error saving times:', error);
    }

    try {
      const distinctBills = this.getDistinctBills(bills);
      const existingBills = await this.billRepo.find({
        where: distinctBills.map(bill => ({
          rgiCode: bill.rgiCode,
          billDate: bill.billDate,
          hidrometer: bill.hidrometer,
          plant: bill.plant,
        })),
      });

      const existingBillMap = new Set(existingBills.map(bill =>
        `${bill.rgiCode}-${bill.billDate.getTime()}-${bill.hidrometer}-${bill.plant}`
      ));

      const newBills = distinctBills.filter(bill =>
        !existingBillMap.has(
          `${bill.rgiCode}-${bill.billDate.getTime()}-${bill.hidrometer}-${bill.plant}`
        )
      );

      await this.billRepo.save(newBills);
    } catch (error) {
      console.error('Error saving bills:', error);
    }
  }

  getDistinctObjects(array) {
    return array.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.month === obj.month && t.year === obj.year)
    );
  }

  getDistinctBills(array) {
    return array.filter(
      (obj, index, self) =>
        index === self.findIndex(
          (t) =>
            t.rgiCode === obj.rgiCode &&
            t.billDate.getTime() === obj.billDate.getTime() &&
            t.hidrometer === obj.hidrometer &&
            t.plant === obj.plant
        )
    );
  }
}
