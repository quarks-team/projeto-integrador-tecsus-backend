import { EnergyBillPayload } from '../../src/domain/request/energy-bill-payload';

describe('EnergyBillPayload', () => {
  it('should create an instance of EnergyBillPayload', () => {
    const payload = new EnergyBillPayload();
    expect(payload).toBeDefined();
  });

  it('should set properties correctly', () => {
    const payload = new EnergyBillPayload();
    payload.Planta = 'TestPlant';
    payload['Conta do Mês'] = '01/01/2020';
    payload.Total = '100';
    expect(payload.Planta).toBe('TestPlant');
    expect(payload['Conta do Mês']).toBe('01/01/2020');
    expect(payload.Total).toBe('100');
  });
});
