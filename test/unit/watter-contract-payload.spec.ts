import { WatterContractPayload } from '../../src/domain/request/watter-contract-payload';

describe('WatterContractPayload', () => {
  it('should create an instance of WatterContractPayload', () => {
    const payload = new WatterContractPayload();
    expect(payload).toBeDefined();
  });

  it('should set properties correctly', () => {
    const payload = new WatterContractPayload();
    payload.Planta = 'TestPlant';
    payload['Nome do Contrato'] = 'TestContract';
    payload.Fornecedor = 'TestProvider';
    expect(payload.Planta).toBe('TestPlant');
    expect(payload['Nome do Contrato']).toBe('TestContract');
    expect(payload.Fornecedor).toBe('TestProvider');
  });
});
