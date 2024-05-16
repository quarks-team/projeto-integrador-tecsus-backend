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
    @InjectRepository(EnergyBillGroupB)
    private readonly billGroupBRepo: Repository<EnergyBillGroupB>,
  ) { }
  async execute(energyBills: EnergyBillPayload[]) {
    const times: Partial<Time>[] = [];
    const aGroupBills: Partial<EnergyBillGroupA>[] = [];
    const bGroupBills: Partial<EnergyBillGroupB>[] = [];

    console.log(energyBills);

    energyBills.forEach((bill) => {
      const [day, month, year] = bill['Conta do Mês'].split('/').map(Number);
      const billDate = new Date(year, month - 1, day);

      if (
        parseFloat(bill['Consumo PT VD'].replace(',', '')) > 0 &&
        parseFloat(bill['Consumo FP CAP VD'].replace(',', '')) > 0 &&
        parseFloat(bill['Consumo FP IND VD'].replace(',', '')) > 0) {
        bGroupBills.push({
          month: billDate,
          total: Number.parseFloat(bill.Total.replace(',', '')),
          instalationNumber: bill['Número Instalação'],
          provider: bill.Fornecedor,
          medidorNumber: bill['Número Medidor'],
          plant: bill.Planta,
          totalConsume: Number.parseFloat(
            bill['Consumo PT VD'].replace(',', '')
          ) +
            Number.parseFloat(
              bill['Consumo FP CAP VD'].replace(',', '')
            ) +
            Number.parseFloat(
              bill['Consumo FP IND VD'].replace(',', '')
            )
          ,
          sistDistrUse: 0,
          sistDistrUseCost: 0
        });
      } else {
        aGroupBills.push({
          month: billDate,
          total: Number.parseFloat(bill.Total.replace(',', '')),
          instalationNumber: bill['Número Instalação'],
          provider: bill.Fornecedor,
          plant: bill.Planta,
          ptDemand: Number.parseFloat(
            bill['Demanda PT (kW)'].replace(',', '')
          ),
          fpCapDemand: Number.parseFloat(
            bill['Demanda FP CAP (kW)'].replace(',', '')
          ),
          fpIndDemand: Number.parseFloat(
            bill['Demanda FP IND (kW)'].replace(',', '')
          ),
          ptVdConsume: Number.parseFloat(
            bill['Consumo PT VD'].replace(',', '')
          ),
          fpCapVdConsume: Number.parseFloat(
            bill['Consumo FP CAP VD'].replace(',', '')
          ),
          fpIndVdConsume: Number.parseFloat(
            bill['Consumo FP IND VD'].replace(',', '')
          ),
          aPtTusdConsume: Number.parseFloat(
            bill['Consumo A PT (TUSD) Custo'].replace(',', '')
          ),
          aPtTeConsume: Number.parseFloat(
            bill['Consumo A PT (TE) Custo'].replace(',', '')
          ),
          aFpTusdConsume: Number.parseFloat(
            bill['Consumo A FP (TUSD) Custo'].replace(',', '')
          ),
          aFpTeConsume: Number.parseFloat(
            bill['Consumo A FP (TE) Custo'].replace(',', '')
          )
        });
      }

      times.push({
        month: month.toString(),
        year: year.toString(),
      });
    });

    const savedTimes = await this.timeRepo.save(this.getDistinctObjects(times));
    console.log(savedTimes);

    const savedBGroupBills = await this.billGroupBRepo.save(bGroupBills);
    console.log(savedBGroupBills);

    const savedAGroupBills = await this.billGroupARepo.save(aGroupBills);
    return savedAGroupBills;
  }
  getDistinctObjects(array) {
    return array.filter(
      (obj, index, self) =>
        index ===
        self.findIndex((t) => t.month === obj.month && t.year === obj.year),
    );
  }
}
