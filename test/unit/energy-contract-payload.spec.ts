import { EnergyContractPayload } from '../../src/domain/request/energy-contract-payload';

describe('EnergyContractPayload', () => {
  it('should create an instance of EnergyContractPayload', () => {
    const payload = new EnergyContractPayload();
    expect(payload).toBeDefined();
  });

  it('should set properties correctly', () => {
    const payload = new EnergyContractPayload();
    payload.Planta = 'TestPlant';
    payload['Nome do Contrato'] = 'TestContract';
    payload.Fornecedor = 'TestProvider';
    expect(payload.Planta).toBe('TestPlant');
    expect(payload['Nome do Contrato']).toBe('TestContract');
    expect(payload.Fornecedor).toBe('TestProvider');
  });
});
