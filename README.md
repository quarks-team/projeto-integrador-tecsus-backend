# Dashboard Web de Análise de Faturas de Energia, Água e Gás

Este projeto consiste no desenvolvimento de um dashboard web de alta complexidade para análise e exibição de dados de faturas de energia, água e gás. O objetivo é fornecer insights valiosos para empresas clientes da TecSUS, permitindo a redução de custos e otimização de contratos.

## Descrição do Projeto

A TecSUS realiza a coleta e processamento de contas de energia, água e gás para diversas empresas dos setores do atacado e varejo. Cada conta coletada precisa ter todos os seus campos digitados e salvos em banco de dados para eventuais consultas e análises técnicas/financeiras que podem trazer ao cliente oportunidades de redução de custos e alteração de contratos. Cada unidade do cliente pode possuir vários contratos (água, energia ou gás), cada contrato pode possuir uma ou mais contas (faturas de água, energia ou gás) por mês. Todos esses contratos estão ligados a uma concessionária de abastecimento. A TecSUS possui uma base de dados de unidades, contratos, contas e concessionárias desestruturada em arquivo texto, a empresa tem interesse em aplicar técnicas de ETL e utilizar ferramentas de visualização de dados do mercado.

## Funcionalidades Principais

- **Extrair, Transformar e Carregar (ETL)**: Sistema para extrair, transformar e carregar dados de unidades, concessionárias, contratos e contas.
- **Relatórios de Consumo**: Geração de relatórios de consumo total de água, energia e gás mensal, anual e média.
- **Alertas de Consumo**: Sistema de alertas para identificar consumos acima da média dos últimos 3 meses.

## Requisitos Não Funcionais

- **Esteira de DevOps**: Implementação de uma esteira de DevOps para garantir integração contínua e entrega contínua do projeto.

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Node.js, Express.js, MongoDB
- **Ferramentas de Visualização de Dados**: D3.js, Chart.js
- **DevOps**: Docker, Jenkins, Kubernetes

## Como Executar o Projeto

1. Clone este repositório em sua máquina local.
2. Navegue até o diretório do projeto.
3. Instale as dependências do frontend e do backend utilizando `npm install`.
4. Inicie o servidor backend utilizando `npm start`.
5. Inicie o servidor frontend utilizando `npm start`.
6. Acesse o aplicativo em seu navegador utilizando o endereço `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue para discutir novas funcionalidades, melhorias ou correções de bugs.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

