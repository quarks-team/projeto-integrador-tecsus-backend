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

    console.log('Energy Bills:', energyBills);

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
          fpCapDemand: Number.parseFloat(bill['Demanda FP CAP (kW)'].replace(',', '')),
          fpIndDemand: Number.parseFloat(bill['Demanda FP IND (kW)'].replace(',', '')),
          ptVdConsume: Number.parseFloat(bill['Consumo PT VD'].replace(',', '')),
          fpCapVdConsume: Number.parseFloat(bill['Consumo FP CAP VD'].replace(',', '')),
          fpIndVdConsume: Number.parseFloat(bill['Consumo FP IND VD'].replace(',', '')),
          aPtTusdConsume: Number.parseFloat(bill['Consumo A PT (TUSD) Custo'].replace(',', '')),
          aPtTeConsume: Number.parseFloat(bill['Consumo A PT (TE) Custo'].replace(',', '')),
          aFpTusdConsume: Number.parseFloat(bill['Consumo A FP (TUSD) Custo'].replace(',', '')),
          aFpTeConsume: Number.parseFloat(bill['Consumo A FP (TE) Custo'].replace(',', '')),
        });
      }

      times.push({
        month: month.toString(),
        year: year.toString(),
      });
    });

    console.log('Times before saving:', times);

    try {
      for (const time of this.getDistinctObjects(times)) {
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
    } catch (error) {
      console.error('Error saving times:', error);
    }

    const distinctBGroupBills = this.getDistinctBills(bGroupBills);
    const distinctAGroupBills = this.getDistinctBills(aGroupBills);

    console.log('Distinct B Group Bills:', distinctBGroupBills);
    console.log('Distinct A Group Bills:', distinctAGroupBills);

    for (const bBill of distinctBGroupBills) {
      try {
        const existsBill = await this.billGroupBRepo.findOne({
          where: {
            month: bBill.month,
            total: bBill.total,
            instalationNumber: bBill.instalationNumber,
            provider: bBill.provider,
            plant: bBill.plant,
            totalConsume: bBill.totalConsume,
            sistDistrUse: bBill.sistDistrUse,
            sistDistrUseCost: bBill.sistDistrUseCost,
          },
        });
        console.log('Existing B Group Bill:', existsBill);
        if (!existsBill) {
          const savedBill = await this.billGroupBRepo.save(bBill);
          console.log('Saved B Group Bill:', savedBill);
        }
      } catch (error) {
        console.error('Error saving B group bill:', error);
      }
    }

    for (const aBill of distinctAGroupBills) {
      try {
        const existsBill = await this.billGroupARepo.findOne({
          where: {
            month: aBill.month,
            total: aBill.total,
            instalationNumber: aBill.instalationNumber,
            provider: aBill.provider,
            plant: aBill.plant,
            ptDemand: aBill.ptDemand,
            fpCapDemand: aBill.fpCapDemand,
            fpIndDemand: aBill.fpIndDemand,
            ptVdConsume: aBill.ptVdConsume,
            fpCapVdConsume: aBill.fpCapVdConsume,
            fpIndVdConsume: aBill.fpIndVdConsume,
            aPtTusdConsume: aBill.aPtTusdConsume,
            aPtTeConsume: aBill.aPtTeConsume,
            aFpTusdConsume: aBill.aFpTusdConsume,
            aFpTeConsume: aBill.aFpTeConsume,
          },
        });
        console.log('Existing A Group Bill:', existsBill);
        if (!existsBill) {
          const savedBill = await this.billGroupARepo.save(aBill);
          console.log('Saved A Group Bill:', savedBill);
        }
      } catch (error) {
        console.error('Error saving A group bill:', error);
      }
    }
  }

  getDistinctObjects(array) {
    return array.filter(
      (obj, index, self) =>
        index ===
        self.findIndex((t) => t.month === obj.month && t.year === obj.year)
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
            t.aFpTeConsume === obj.aFpTeConsume
        )
    );
  }
}
