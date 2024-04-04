# Dashboard Web de Análise de Faturas de Energia, Água e Gás


## Contexto

A TecSUS realiza a coleta e processamento de contas de energia, água e gás para diversas empresas dos setores do atacado e varejo. Cada conta coletada precisa ter todos os seus campos digitados e salvos em banco de dados para eventuais consultas e análises técnicas/financeiras que podem trazer ao cliente oportunidades de redução de custos e alteração de contratos. Cada unidade do cliente pode possuir vários contratos (água, energia ou gás), cada contrato pode possuir uma ou mais contas (faturas de água, energia ou gás) por mês. Todos esses contratos estão ligados a uma concessionária de abastecimento. A TecSUS possui uma base de dados de unidades, contratos, contas e concessionárias desestruturada em arquivo texto, a empresa tem interesse em aplicar técnicas de ETL e utilizar ferramentas de visualização de dados do mercado.

## Desafio
Este projeto consiste no desenvolvimento de um dashboard web de alta complexidade para análise e exibição de dados de faturas de energia, água e gás. O objetivo é fornecer insights valiosos para empresas clientes da TecSUS, permitindo a redução de custos e otimização de contratos.

<p align="right">(<a href="#top">Scroll to top</a>)</p>

<li>Requisitos Funcionais</li>
<ul>
      <li>Extrair, Transformar e Carregar (ETL): Sistema para extrair, transformar e carregar dados de unidades, concessionárias, contratos e contas;</li>
      <li>**Relatórios de Consumo: Geração de relatórios de consumo total de água, energia e gás mensal, anual e média;</li>
      <li>Alertas de Consumo: Sistema de alertas para identificar consumos acima da média dos últimos 3 meses;</li>
</ul>

<li>Requisitos Não Funcionais</li>
<ul>
      <li>Esteira de DevOps: Implementação de uma esteira de DevOps para garantir integração contínua e entrega contínua do projeto;</li>
</ul>

<p align="right">(<a href="#top">Scroll to top</a>)</p>

## Solution

Nós da equipe Quarks vamos desenvolver um sistema web que irá permitir que o cliente faça o o input dos aquivos brutos com os dados de sua conta e visualize todos os dashbords e relatórios.

Visando solucionar o projeto, o sistema será entregue em quatro sprints:


| Sprint                  | Need                       | Product         |
| ------------------------| ---------------------------|-----------------|
|Sprint 1                 | ETL e Integração de Dados  | Desenvolver um sistema para extrair dados de unidades, concessionárias, contratos e contas a partir de arquivos de texto desestruturados, transformar os dados extraídos em formatos adequados para análise e visualização e criar mecanismos para carregar os dados transformados em um banco de dados para posterior consulta e análise.|
|Sprint 2                 | Relatórios de Consumo      | Desenvolver funcionalidades para gerar relatórios de consumo total de água, energia e gás mensal, anual e média para cada cliente. |
|Sprint 3                 | Alertas de Consumo         | Desenvolver um sistema de geração de alertas para identificar consumos acima da média dos últimos 3 meses e notificar os usuários. |
|Sprint 4                 | DevOps                     | Implementar uma esteira de DevOps para garantir a integração contínua, entrega contínua e automação de testes, visando a eficiência e qualidade do processo de desenvolvimento. |

<p align="right">(<a href="#top">Scroll to top</a>)</p>

## Schedule

| Event                   | Date         |
| ------------------------| -------------|
|Kick-off                 |       -      |
|Sprint 1                 |25/03 to 15/04|
|Sprint 2                 |15/04 to 06/05|
|Sprint 3                 |06/05 to 27/05|
|Sprint 4                 |27/05 to 17/06|
|Feira de Soluções        |       -      |

<p align="right">(<a href="#top">Scroll to top</a>)</p>

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Node.js, Express.js, MongoDB
- **Ferramentas de Visualização de Dados**: D3.js, Chart.js
- **DevOps**: Docker, Jenkins, Kubernetes

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue para discutir novas funcionalidades, melhorias ou correções de bugs.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

