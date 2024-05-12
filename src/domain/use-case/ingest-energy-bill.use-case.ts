import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnergyBill } from '../entity/energy-bill.entity';
import { EnergyBillPayload } from '../request/energy-bill-payload';
import { Time } from '../entity/time.entity';

export class IngestEnergyBill {
  constructor(
    @InjectRepository(Time) private readonly timeRepo: Repository<Time>,
    @InjectRepository(EnergyBill)
    private readonly billRepo: Repository<EnergyBill>,
  ) { }
  async execute(energyBills: EnergyBillPayload[]) {
    const times: Partial<Time>[] = [];
    const bills: Partial<EnergyBill>[] = [];

    energyBills.forEach((bill) => {
      const [day, month, year] = bill['Conta do Mês'].split('/').map(Number);
      const billDate = new Date(year, month - 1, day);

      bills.push({
        month: billDate,
        instalationNumber: bill['Número Instalação'],
        total: Number.parseInt(bill.Total.replace(',', '')),
        medidorNumber: bill['Número Medidor'],
        totalConsume: Number.parseInt(
          bill['Total Compra de Energia'].replace(',', ''),
        ),
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
