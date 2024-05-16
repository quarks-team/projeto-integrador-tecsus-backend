import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnergyBillGroupA } from '../entity/energy-bill-group-a.entity';
import { EnergyBillGroupB } from '../entity/energy-bill-group-b.entity';
import { EnergyBillPayload } from '../request/energy-bill-payload';
import { Time } from '../entity/time.entity';

export class IngestEnergyBill {
  constructor(
    @InjectRepository(Time) private readonly timeRepo: Repository<Time>,
    @InjectRepository(EnergyBillGroupA)
    private readonly billGroupARepo: Repository<EnergyBillGroupA>,
    @InjectRepository(EnergyBillGroupA)
    private readonly billGroupBRepo: Repository<EnergyBillGroupB>,
  ) {}
  async execute(energyBills: EnergyBillPayload[]) {
    const times: Partial<Time>[] = [];
    const bills: Partial<EnergyBill>[] = [];

    energyBills.forEach((bill) => {
      if(bill from tipo B ==){
        ingest type b bills
      } else{
        ingest type a bills
      }
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
