import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Time } from '../entity/time.entity';
import { EnergyBill } from '../entity/energy-bill.entity';
import { EnergyBillPayload } from '../request/energy-bill-payload';

@Injectable()
export class IngestEnergyBill {
  constructor(
    @InjectRepository(Time) private readonly timeRepo: Repository<Time>,
    @InjectRepository(EnergyBill) private readonly billRepo: Repository<EnergyBill>,
  ) {}

  async execute(energyBills: EnergyBillPayload[]) {
    const times: Partial<Time>[] = [];
    const bills: Partial<EnergyBill>[] = [];

    energyBills.forEach((bill) => {
      const [day, month, year] = bill['Conta do Mês'].split('/').map(Number);
      const billDate = new Date(year, month - 1, day);

      bills.push({
        month: billDate,
        instalationNumber: bill['Número Instalação'].replace(/[-\/]/g, ''),
        total: Number.parseInt(bill.Total.replace(',', '')),
        medidorNumber: bill['Número Medidor'],
        totalConsume: Number.parseInt(bill['Total Compra de Energia'].replace(',', '')),
        plant: bill.Planta,
      });

      times.push({
        month: month.toString(),
        year: year.toString(),
      });

      // Remove commas from individual columns
      for (const key in bill) {
        if (Object.prototype.hasOwnProperty.call(bill, key) && key.startsWith('Consumo')) {
          bill[key] = bill[key].replace(',', '').replace('NaN', '0');
        }
      }
    });

    await this.timeRepo.save(this.getDistinctObjects(times));

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
