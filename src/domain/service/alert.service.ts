import { Injectable } from '@nestjs/common';
import { WatterAlert } from '../entity/watter-alerts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WastepipeAlert } from '../entity/wastepipe-alert.entity';
import { AEnergyConsumeAlert } from '../entity/a-energy-alerts.entity';
import { BEnergyConsumeAlert } from '../entity/b-energy-alerts.entity';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(WatterAlert)
    private readonly watterAlertRepo: Repository<WatterAlert>,
    @InjectRepository(WastepipeAlert)
    private readonly wastepipeAlertRepo: Repository<WastepipeAlert>,
    @InjectRepository(AEnergyConsumeAlert)
    private readonly aEnergyConsumeAlertRepo: Repository<AEnergyConsumeAlert>,
    @InjectRepository(BEnergyConsumeAlert)
    private readonly bEnergyConsumeAlertRepo: Repository<BEnergyConsumeAlert>,
  ) {}
  async getAll(): Promise<{
    watter: WatterAlert[];
    wastepipe: WastepipeAlert[];
  }> {
    const alerts = {
      watter: [],
      wastepipe: [],
      energyA: [],
      energyB: [],
    };
    alerts.watter = await this.watterAlertRepo.find();
    alerts.wastepipe = await this.wastepipeAlertRepo.find();
    alerts.energyA = await this.aEnergyConsumeAlertRepo.find();
    alerts.energyB = await this.bEnergyConsumeAlertRepo.find();
    return alerts;
  }
}
