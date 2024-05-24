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
  ) {}

  async execute(energyBills: EnergyBillPayload[]) {
    const times: Partial<Time>[] = [];
    const aGroupBills: Partial<EnergyBillGroupA>[] = [];
    const bGroupBills: Partial<EnergyBillGroupB>[] = [];

    energyBills.forEach((bill) => {
      const [day, month, year] = bill['Conta do Mês'].split('/').map(Number);
      const billDate = new Date(year, month - 1, day);

      if (
        parseFloat(bill['Consumo PT VD'].replace(',', '')) > 0 &&
        parseFloat(bill['Consumo FP CAP VD'].replace(',', '')) > 0 &&
        parseFloat(bill['Consumo FP IND VD'].replace(',', '')) > 0
      ) {
        bGroupBills.push({
          month: billDate,
          total: Number.parseFloat(bill.Total.replace(',', '')),
          instalationNumber: bill['Número Instalação'],
          provider: bill.Fornecedor,
          medidorNumber: bill['Número Medidor'],
          plant: bill.Planta,
          totalConsume:
            Number.parseFloat(bill['Consumo PT VD'].replace(',', '')) +
            Number.parseFloat(bill['Consumo FP CAP VD'].replace(',', '')) +
            Number.parseFloat(bill['Consumo FP IND VD'].replace(',', '')),
          sistDistrUse: 0,
          sistDistrUseCost: 0,
        });
      } else {
        aGroupBills.push({
          month: billDate,
          total: Number.parseFloat(bill.Total.replace(',', '')),
          instalationNumber: bill['Número Instalação'],
          provider: bill.Fornecedor,
          plant: bill.Planta,
          ptDemand: Number.parseFloat(bill['Demanda PT (kW)'].replace(',', '')),
          fpCapDemand: Number.parseFloat(
            bill['Demanda FP CAP (kW)'].replace(',', ''),
          ),
          fpIndDemand: Number.parseFloat(
            bill['Demanda FP IND (kW)'].replace(',', ''),
          ),
          ptVdConsume: Number.parseFloat(
            bill['Consumo PT VD'].replace(',', ''),
          ),
          fpCapVdConsume: Number.parseFloat(
            bill['Consumo FP CAP VD'].replace(',', ''),
          ),
          fpIndVdConsume: Number.parseFloat(
            bill['Consumo FP IND VD'].replace(',', ''),
          ),
          aPtTusdConsume: Number.parseFloat(
            bill['Consumo A PT (TUSD) Custo'].replace(',', ''),
          ),
          aPtTeConsume: Number.parseFloat(
            bill['Consumo A PT (TE) Custo'].replace(',', ''),
          ),
          aFpTusdConsume: Number.parseFloat(
            bill['Consumo A FP (TUSD) Custo'].replace(',', ''),
          ),
          aFpTeConsume: Number.parseFloat(
            bill['Consumo A FP (TE) Custo'].replace(',', ''),
          ),
        });
      }

      times.push({
        month: month.toString(),
        year: year.toString(),
      });
    });

    try {
      const distinctTimes = this.getDistinctObjects(times);
      const existingTimes = await this.timeRepo.find({
        where: distinctTimes.map((time) => ({
          month: time.month,
          year: time.year,
        })),
      });

      const existingTimeMap = new Set(
        existingTimes.map((time) => `${time.month}-${time.year}`),
      );
      const newTimes = distinctTimes.filter(
        (time) => !existingTimeMap.has(`${time.month}-${time.year}`),
      );

      await this.timeRepo.save(newTimes);
    } catch (error) {
      console.error('Error saving times:', error);
    }

    const distinctBGroupBills = this.getDistinctBills(bGroupBills);
    const distinctAGroupBills = this.getDistinctBills(aGroupBills);

    try {
      const existingBGroupBills = await this.billGroupBRepo.find({
        where: distinctBGroupBills.map((bBill) => ({
          month: bBill.month,
          instalationNumber: bBill.instalationNumber,
          provider: bBill.provider,
          plant: bBill.plant,
        })),
      });

      const existingBGroupBillMap = new Set(
        existingBGroupBills.map(
          (bBill) =>
            `${bBill.month.getTime()}-${bBill.instalationNumber}-${bBill.provider}-${bBill.plant}`,
        ),
      );

      const newBGroupBills = distinctBGroupBills.filter(
        (bBill) =>
          !existingBGroupBillMap.has(
            `${bBill.month.getTime()}-${bBill.instalationNumber}-${bBill.provider}-${bBill.plant}`,
          ),
      );

      await this.billGroupBRepo.save(newBGroupBills);
    } catch (error) {
      console.error('Error saving B group bills:', error);
    }

    try {
      const existingAGroupBills = await this.billGroupARepo.find({
        where: distinctAGroupBills.map((aBill) => ({
          month: aBill.month,
          instalationNumber: aBill.instalationNumber,
          provider: aBill.provider,
          plant: aBill.plant,
        })),
      });

      const existingAGroupBillMap = new Set(
        existingAGroupBills.map(
          (aBill) =>
            `${aBill.month.getTime()}-${aBill.instalationNumber}-${aBill.provider}-${aBill.plant}`,
        ),
      );

      const newAGroupBills = distinctAGroupBills.filter(
        (aBill) =>
          !existingAGroupBillMap.has(
            `${aBill.month.getTime()}-${aBill.instalationNumber}-${aBill.provider}-${aBill.plant}`,
          ),
      );

      await this.billGroupARepo.save(newAGroupBills);
    } catch (error) {
      console.error('Error saving A group bills:', error);
    }
  }

  getDistinctObjects(array) {
    return array.filter(
      (obj, index, self) =>
        index ===
        self.findIndex((t) => t.month === obj.month && t.year === obj.year),
    );
  }

  getDistinctBills(array) {
    return array.filter(
      (obj, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.month.getTime() === obj.month.getTime() &&
            t.total === obj.total &&
            t.instalationNumber === obj.instalationNumber &&
            t.provider === obj.provider &&
            t.plant === obj.plant &&
            t.ptDemand === obj.ptDemand &&
            t.fpCapDemand === obj.fpCapDemand &&
            t.fpIndDemand === obj.fpIndDemand &&
            t.ptVdConsume === obj.ptVdConsume &&
            t.fpCapVdConsume === obj.fpCapVdConsume &&
            t.fpIndVdConsume === obj.fpIndVdConsume &&
            t.aPtTusdConsume === obj.aPtTusdConsume &&
            t.aPtTeConsume === obj.aPtTeConsume &&
            t.aFpTusdConsume === obj.aFpTusdConsume &&
            t.aFpTeConsume === obj.aFpTeConsume,
        ),
    );
  }
}
