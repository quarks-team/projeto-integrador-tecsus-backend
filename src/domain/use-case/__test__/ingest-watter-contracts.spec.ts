import { TestingModule, Test } from '@nestjs/testing';
import { IngestWatterContract } from '../ingest-watter-contracts.use-case';
import { watterContractsStub } from '../../request/stubs/watter-contract.stub';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unity } from '../../../domain/entity/unity.entity';
import { TypeORMMySqlTestingModule } from '../../../test-utils/TypeORMMySqlTestingModule';
import { Concessionaire } from '../../../domain/entity/concessionaire.entity';
import { Contract } from '../../../domain/entity/contract.entity';

describe('Ingest watter contracts use case', async () => {
  let usecase: IngestWatterContract;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeORMMySqlTestingModule([Unity, Concessionaire, Contract]),
        TypeOrmModule.forFeature([Unity]),
        TypeOrmModule.forFeature([Concessionaire]),
        TypeOrmModule.forFeature([Contract]),
      ],
      controllers: [],
      providers: [IngestWatterContract],
    }).compile();

    usecase = app.get<IngestWatterContract>(IngestWatterContract);
  });

  it('pass', async () => {
    const response = await usecase.execute(watterContractsStub);
    expect(response).toBe({});
  });
});
