import { Injectable } from '@nestjs/common';
import csvToJson from 'csvtojson';
import { WatterContractPayload } from '../request/watter-contract-payload';
import { EnergyContractPayload } from '../request/energy-contract-payload';
import { EnergyBillPayload } from '../request/energy-bill-payload';
import { WatterBillPayload } from '../request/watter-bill-payload';
import { IngestWatterContract } from '../use-case/ingest-watter-contracts.use-case';
import { IngestEnergyContract } from '../use-case/ingest-energy-contract.use-case';
import { IngestEnergyBill } from '../use-case/ingest-energy-bill.use-case';
import { IngestWatterBill } from '../use-case/ingest-watter-bill.use-case';
import { GenerateEnergyFact } from '../use-case/generate-energy-fact.use-case';
import { GenerateWatterFact } from '../use-case/generate-watter-fact.use-case';

@Injectable()
export class BillingService {
  constructor(
    private readonly ingestWatterContract: IngestWatterContract,
    private readonly ingestEnergyContract: IngestEnergyContract,
    private readonly ingestEnergyBill: IngestEnergyBill,
    private readonly ingestWatterBill: IngestWatterBill,
    private readonly generateEnergyFact: GenerateEnergyFact,
    private readonly generateWatterFact: GenerateWatterFact,
  ) {}

  async transform(
    fileName: string,
    path: string,
    log: (message: string, technical?: boolean) => void,
  ): Promise<string> {
    let bills = [];

    log(`${fileName}: Iniciando o processo de transformação ETL...`);

    log(`${fileName}: Carregando dados do arquivo.`);
    try {
      const obj = await csvToJson().fromFile(path);

      bills = obj;

      log(`${fileName}: Dados carregados com sucesso.`);
    } catch (error: any) {
      log(`${fileName}: Erro ao carregar dados: ` + error.message, true);
      throw new Error(`${fileName}: Falha ao carregar dados do arquivo.`);
    }

    const name = fileName.substring(0, fileName.length - 4);

    log(`${fileName}: Identificando o tipo de arquivo: ` + name);
    try {
      switch (name) {
        case 'con_agua':
          log(`${fileName}: Processando contratos de água...`);
          const watterContracts: WatterContractPayload[] = bills;
          await this.ingestWatterContract.execute(watterContracts);
          log(
            `${fileName}: Contratos de água processados com sucesso. Tabelas dimensão atualizadas.`,
          );
          log(`${fileName}: Gerando tabela fato de água...`);
          await this.generateWatterFact.execute();
          log(`${fileName}: Tabela fato de água gerada com sucesso.`);
          break;
        case 'con_energia':
          log(`${fileName}: Processando contratos de energia...`);
          const energyContracts: EnergyContractPayload[] = bills;
          await this.ingestEnergyContract.execute(energyContracts);
          log(
            `${fileName}: Contratos de energia processados com sucesso. Tabelas dimensão atualizadas.`,
          );
          log(`${fileName}: Gerando tabela de fato de energia...`);
          await this.generateEnergyFact.execute();
          log(`${fileName}: Tabela fato de energia gerada com sucesso.`);
          break;
        case 'pro_energia':
          log(`${fileName}: Processando contas de energia...`);
          const energyBills: EnergyBillPayload[] = bills;
          await this.ingestEnergyBill.execute(energyBills);
          log(
            `${fileName}: Contas de energia processadas com sucesso. Tabelas dimensão atualizadas.`,
          );
          log(`${fileName}: Gerando tabela fato de energia...`);
          await this.generateEnergyFact.execute();
          log(`${fileName}: Tabela fato de energia gerado com sucesso.`);
          break;
        case 'pro_agua':
          log(`${fileName}: Processando contas de água...`);
          const watterBills: WatterBillPayload[] = bills;
          await this.ingestWatterBill.execute(watterBills);
          log(
            `${fileName}: Contas de água processadas com sucesso. Tabelas dimensão atualizadas.`,
          );
          log(`${fileName}: Gerando tabela fato de água...`);
          await this.generateWatterFact.execute();
          log(`${fileName}: Tabela fato de água gerados com sucesso.`);
          break;
        default:
          log(`${fileName}: Tipo de arquivo inválido.`);
          throw new Error(`${fileName}: Nome ou tipo de arquivo inválido.`);
      }

      log(`${fileName}: Processo de ETL no arquivo concluído com sucesso.`);
      return 'billing-ingestion: hmm good ingestion';
    } catch (error: unknown) {
      log(`${fileName}: Erro no processo de ETL: ` + (error as Error)?.message);
    }
  }
}
