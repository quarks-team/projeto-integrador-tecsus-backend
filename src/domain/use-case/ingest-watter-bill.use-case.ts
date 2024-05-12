import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Time } from '../entity/time.entity';
import { WatterBill } from '../entity/watter-bill.entity';
import { WatterBillPayload } from '../request/watter-bill-payload';

export class IngestWatterBill {
  constructor(
    @InjectRepository(Time) private readonly timeRepo: Repository<Time>,
    @InjectRepository(WatterBill)
    private readonly billRepo: Repository<WatterBill>,
  ) { }
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
      });

      times.push({
        month: month.toString(),
        year: year.toString(),
      });
      
      // Check if the billDate already exists in the database
      const existingTime = times.find(time => time.month === month.toString() && time.year === year.toString());

      if (!existingTime) {
        // If the date doesn't exist, add it to the times array for insertion
        times.push({
          month: month.toString(),
          year: year.toString(),
        });
      }
      // Otherwise, do nothing because the date already exists
    });

    // Insert only distinct times into the database
    if (times.length > 0) {
      await this.timeRepo.save(this.getDistinctObjects(times));
    }

    const savedBills = await this.billRepo.save(bills);
    return savedBills;
  }
  getDistinctObjects(array) {
    return array.filter(
      (obj, index, self) =>
        index ===
        self.findIndex((t) => t.month === obj.month && t.year === obj.year),
    );
  }
}
