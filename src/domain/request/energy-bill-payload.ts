export class EnergyBillPayload {
  'Planta': string;
  'Conta do Mês': string;
  'Série da Nota Fiscal': string;
  'Nº Nota Fiscal': string;
  'Reservado ao Fisco': string;
  'Chave de Acesso': string;
  'Data de Vencimento': string;
  'Emissão': string;
  'Código de Barras': string;
  'Leitura Anterior': string;
  'Leitura Atual': string;
  'Uso Sist': object;
  'Consumo PT VD': string;
  'Consumo FP CAP VD': string;
  'Consumo FP IND VD': string;
  'Demanda PT (kW)': string;
  'Demanda FP CAP (kW)': string;
  'Demanda FP IND (kW)': string;
  'Energia R': object;
  'Energia TE': string;
  'Energia TE Custo': string;
  'Demanda Faturada (kW)': string;
  'Demanda Faturada Custo': string;
  'Demanda Faturada PT Custo': string;
  'Demanda Faturada FP Custo': string;
  'Demanda Ultrapassada (kW)': string;
  'Demanda Ultrapassada Custo': string;
  'Demanda Ultrapassada PT Custo': string; // not a duplicate
  'Demanda Ultrapassada FP Custo': string; // not a duplicate
  'Dif Fat TUSD CCEE Custo': string; // not a duplicate
  'Dif Fat ENC CCEE Custo': string; // not a duplicate
  'Consumo A PT (TUSD) Custo': string; // not a duplicate
  'Consumo A PT (TE) Custo': string; // not a duplicate
  'Consumo A FP (TUSD) Custo': string; // not a duplicate
  'Consumo A FP (TE) Custo': string; // not a duplicate
  'Consumo Ener': object; // not a duplicate
  'Custo Ener': object; // not a duplicate
  'Consumo Decreto PT TUSD': string; // not a duplicate
  'Custo Decreto PT TUSD': string; // not a duplicate
  'Consumo Decreto FP TUSD': string; // not a duplicate
  'Custo Decreto FP TUSD': string; // not a duplicate
  'Consumo Decreto PT TE': string; // not a duplicate
  'Custo Decreto PT TE': string; // not a duplicate
  'Consumo Decreto FP TE': string; // not a duplicate
  'Custo Decreto FP TE': string; // not a duplicate
  'Saldo Injetado': string; // not a duplicate
  'Regime ICMS ACL Custo 1': string; // not a duplicate
  'Regime ICMS ACL Custo 1A': string; // not a duplicate
  'Regime ICMS ACL Custo 2': string; // not a duplicate
  'Regime ICMS ACL Custo 2A': string; // not a duplicate
  'Regime PIS COFINS ACL Custo 1': string; // not a duplicate
  'Regime PIS COFINS ACL Custo 1A': string; // not a duplicate
  'Regime PIS COFINS ACL Custo 2': string; // not a duplicate
  'Regime PIS COFINS ACL Custo 2A': string; // not a duplicate
  'Benefício Tarifário Bruto': string; // not a duplicate
  'Benefício Tarifário Líquido': string; // not a duplicate
  'Demanda Lei Estadual Custo': string; // not a duplicate
  'Ufer TE PT Custo': string; // not a duplicate
  'Ufer FP TE Custo': string; // not a duplicate
  'ADD Bandeira AM Custo': string; // not a duplicate
  'ADD Bandeira VM Custo': string; // not a duplicate
  'ADD Bandeira Escassez': string; // not a duplicate
  'Encargo de Conexão Custo': string; // not a duplicate
  'PIS/PASEP Custo': string; // not a duplicate
  'Desconto PIS/PASEP': string; // not a duplicate
  'PIS/PASEP JUDICIAL': string; // not a duplicate
  'COFINS Custo': string; // not a duplicate
  'Desconto COFINS': string; // not a duplicate
  'COFINS JUDICIAL': string; // not a duplicate
  'C de Disp - REN': object; // not a duplicate
  'PC': object; // not a duplicate
  'Desconto Juros de mora': string; // not a duplicate
  'Desconto At': object; // not a duplicate
  'Cobranças': string; // not a duplicate
  'COSIP/CIP Custo': string; // not a duplicate
  'COSIP/CIP REF VCTO': string; // not a duplicate
  'ICMS': string; // not a duplicate
  'ICMS JUDICIAL': string; // not a duplicate
  'Taxa Entrega outra Localidade': string; // not a duplicate
  'Ressarc': object; // not a duplicate
  'Devolução Fatura 1': string; // not a duplicate
  'Devolução Fatura 2': string; // not a duplicate
  'Devolução Fatura 3': string; // not a duplicate
  'Devolução Fatura 4': string; // not a duplicate
  'Devolução Liminar': string; // not a duplicate
  'Taxa Religue': string; // not a duplicate
  'Taxa Desligue': string; // not a duplicate
  'Parcelamento': string; // not a duplicate
  'Multas REF VCTO': string; // not a duplicate
  'Juros de Mora REF VCTO': string; // not a duplicate
  'Atualização Monetária REF VCTO': string; // not a duplicate
  'Taxa Revisão de Fatura': string; // not a duplicate
  'Taxa Visita Técnica': string; // not a duplicate
  'Taxa de Lixo': string; // not a duplicate
  'Taxa TSV-Emissão de 2° Via': string; // not a duplicate
  'Tarifa Energia Reativa PT C/ Imposto': string; // not a duplicate
  'Tarifa Energia Reativa PT S/ Imposto': string; // not a duplicate
  'Tarifa Energia Reativa FP C/ Imposto': string; // not a duplicate
  'Tarifa Energia Reativa FP S/ Imposto': string; // not a duplicate
  'Tarifa Demanda Faturada C/ Imposto': string; // not a duplicate
  'Tarifa Demanda Faturada S/ Imposto': string; // not a duplicate
  'Tarifa Demanda LEI C/ Imposto': string; // not a duplicate
  'Tarifa Demanda LEI S/ Imposto': string; // not a duplicate
  'Tarifa Consumo PT C/ Imposto': string; // not a duplicate
  'Tarifa Consumo PT S/ Imposto': string; // not a duplicate
  'Tarifa Consumo FP C/ Imposto': string; // not a duplicate
  'Tarifa Consumo FP S/ Imposto': string; // not a duplicate
  'Tarifa Consumo PT TE C/ Imposto': string; // not a duplicate
  'Tarifa Consumo PT TE S/ Imposto': string; // not a duplicate
  'Tarifa Consumo FP TE C/ Imposto': string; // not a duplicate
  'Tarifa Consumo FP TE S/ Imposto': string; // not a duplicate
  'Tarifa Uso Sist': object; // not a duplicate
  'Tarifa Energia TE Custo C/ Imposto': string; // not a duplicate
  'Tarifa Energia TE Custo S/ Imposto': string; // not a duplicate
  'Tarifa Demanda Faturada PT C/ Imposto': string; // not a duplicate
  'Tarifa Demanda Faturada PT S/ Imposto': string; // not a duplicate
  'Tarifa Demanda Ultrapassada PT C/ Imposto': string; // not a duplicate
  'Tarifa Demanda Ultrapassada PT S/ Imposto': string; // not a duplicate
  'Tarifa Demanda Ultrapassada FP C/ Imposto': string; // not a duplicate
  'Tarifa Demanda Ultrapassada FP S/ Imposto': string; // not a duplicate
  'Penal': object; // not a duplicate
  'Crédito na próxima Fat.': string; // not a duplicate
  'Devolução de pag Duplic.': string; // not a duplicate
  'Total': string; // not a duplicate
  'Nível de Informações da Fatura': string; // not a duplicate
  'Observações': string; // not a duplicate
  'DIC': string; // not a duplicate
  'DIC Apurado': string; // not a duplicate
  'DMIC': string; // not a duplicate
  'DMIC Apurado': string; // not a duplicate
  'FIC': string; // not a duplicate
  'FIC Apurado': string; // not a duplicate
  'DICRI': string; // not a duplicate
  'DICRI Apurado': string; // not a duplicate
  'Total Compra de Energia': string; // not a duplicate
  'Descrição da Nota': string; // not a duplicate
  'Fornecedor': string; // not a duplicate
  'Código de Identificação': string; // not a duplicate
  'Número Instalação': string; // not a duplicate
  'Número Medidor': string; // not a duplicate
  'Número Cliente': string; // not a duplicate
  'Modalidade': string; // not a duplicate
  'Código de Ligação (RGI)': string; // not a duplicate
  'Hidrômetro': string; // not a duplicate
  'Número Contrato': string; // not a duplicate
  'Código de Consumidor': string; // not a duplicate
}
