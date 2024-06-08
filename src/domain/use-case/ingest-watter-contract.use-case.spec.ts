import { Test, TestingModule } from '@nestjs/testing';
import { IngestWatterContract } from './ingest-watter-contracts.use-case';
import { Repository } from 'typeorm';
import { Unity } from '../entity/unity.entity';
import { MockType } from 'src/test-utils/utils';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WatterContract } from '../entity/watter-contract.entity';
import { PlacePlant } from '../entity/place_plant.entity';

describe('BillingController', () => {
  const unity: Unity = { cnpj: '12034', id: 1 };
  const placePlant: PlacePlant = { id: 12, plant: 'teste' };
  const watterContract: WatterContract = {
    id: 1,
    cnpj: '1234',
    code: '123',
    hidrometer: '123',
    name: 'test',
    provider: 'sabesp',
  };
  let useCase: IngestWatterContract;
  let unityRepo: Repository<Unity>;
  let watterRepo: Repository<WatterContract>;
  const platRepositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      findOne: jest.fn(() => [placePlant]),
      find: jest.fn(() => [placePlant]),
      save: jest.fn((entity) => entity),
      // ...
    }),
  );
  const watterRepositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      findOne: jest.fn(() => [watterContract]),
      find: jest.fn(() => [watterContract]),
      save: jest.fn((entity) => entity),
      // ...
    }),
  );

  const watterContracts = [
    {
      Planta: 'CO',
      Classe: '',
      'Nome do Contrato': 'TAUBATE/SP - VILA DAS GRAÇAS',
      Fornecedor: 'SABESP',
      Acesso: '15.0',
      'Tipo de Consumidor': 'Água/Esgoto',
      'Modelo de Faturamento': 'Único',
      'Número Instalação': '',
      'Número Medidor': '',
      'Número Cliente': '',
      Modalidade: '',
      'Código de Ligação (RGI)': '03948523/46',
      Hidrômetro: 'B14S001048',
      'Número Contrato': '1482039485231',
      'Codificação da Companhia': '04 688 0014 00199 01410 000 8',
      'Identificador de Usuário': '',
      'ID Eletrônico': '',
      Setor: '',
      'Código da Rua': '',
      'Inscrição Cadastral do Imóvel': '',
      'Código de Consumidor': '',
      'Campo Extra 1': 'Uniao',
      'Campo Extra 2': '4600006649',
      'Campo Extra 3': '3568170002109',
      'Campo Extra 4': '3568170002109',
      'Contrato Relação 1': '',
      'Contrato Relação 2': '',
      'Unidade Métrica': 'm³',
      'Forma de Pagamento': 'Boleto',
      'Tipo de Acesso a Distribuidora': 'RGI',
      'Campo Extra de Acesso 1': '',
      Senha: '',
      'Endereço de Instalação':
        'RUA SAO VICENTE DE PAULA, 17 ANHANGUERA - VL DAS GRACAS',
      'Vigência Inicial': 'Invalid date',
      'Vigência Final': '01/11/2020',
      Observação: '',
      End: {
        ' Divergente': 'Desativado',
      },
      Ativado: 'Desativado',
      'Loja Nova': 'Desativado',
      Histórico: 'Desativado',
      contractName: '',
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        {
          provide: getRepositoryToken(Unity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(WatterContract),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PlacePlant),
          useFactory: watterRepositoryMockFactory,
        },
        IngestWatterContract,
      ],
    }).compile();

    useCase = app.get<IngestWatterContract>(IngestWatterContract);
    unityRepo = app.get<Repository<Unity>>(getRepositoryToken(Unity));
    watterRepo = app.get<Repository<WatterContract>>(
      getRepositoryToken(WatterContract),
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      jest.spyOn(unityRepo, 'find').mockResolvedValueOnce([unity]);
      jest.spyOn(watterRepo, 'find').mockResolvedValueOnce([watterContract]);
      const repoSpy = jest.spyOn(watterRepo, 'save');
      const teste = jest.spyOn(unityRepo, 'save');
      expect(await useCase.execute(watterContracts)).toEqual({
        contracts: [
          {
            cnpj: '356817029',
            code: '0394852346',
            hidrometer: 'B14S001048',
            name: 'TAUBATE/SP - VILA DAS GRAÇAS',
            provider: 'SABESP',
          },
        ],
        unitys: [{ cnpj: '356817029' }],
      });
      expect(repoSpy).toBe([
        {
          cnpj: '356817029',
          code: '0394852346',
          hidrometer: 'B14S001048',
          name: 'TAUBATE/SP - VILA DAS GRAÇAS',
          provider: 'SABESP',
        },
      ]);
      expect(teste).toHaveBeenCalledWith({});
    });
  });
});
