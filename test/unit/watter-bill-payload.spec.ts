import { WatterBillPayload } from '../../src/domain/request/watter-bill-payload';

describe('WatterBillPayload', () => {
  it('should create an instance of WatterBillPayload', () => {
    const payload = new WatterBillPayload();
    expect(payload).toBeDefined();
  });

  it('should set properties correctly', () => {
    const payload = new WatterBillPayload();
    payload.Planta = 'TestPlant';
    payload['Conta do Mês'] = '01/01/2020';
    payload['Valor Água R$'] = '100';
    expect(payload.Planta).toBe('TestPlant');
    expect(payload['Conta do Mês']).toBe('01/01/2020');
    expect(payload['Valor Água R$']).toBe('100');
  });
});
