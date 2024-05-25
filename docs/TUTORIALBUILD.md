### English
## Setting log_bin_trust_function_creators in MySQL Docker Container
## To ensure the log_bin_trust_function_creators setting is configured correctly in your MySQL Docker container, follow these steps:

### Step-by-Step Instructions
### Access the MySQL shell and set the log_bin_trust_function_creators variable:

    docker exec -it projeto-integrador-tecsus-backend-mysql-1 mysql -u root -p

    Enter the MySQL root password (admin).

    Now in the mysql prompt(docker) set the variable log_bin_trust_function_creators to 1:

    SET GLOBAL log_bin_trust_function_creators = 1;

### Verify if the settings worked properly:

    SHOW VARIABLES LIKE 'log_bin_trust_function_creators';
    The output should confirm the variable is set to 1.

### After running these, you can run the ddl script from our Database repository:

    [ddl](https://github.com/quarks-team/Projeto-Integrador-TecSUS-Database/blob/main/script_banco_API_v.07.sql)

### With all tables in the ddl created, you can create the tables, triggers and functions for the alerts and use the application!:

    [trgFunctions](https://github.com/quarks-team/Projeto-Integrador-TecSUS-Database/blob/main/trigger_alerta_consumo.sql)

<br> <br>

### Português
## Configurando log_bin_trust_function_creators no Contêiner Docker MySQL
## Para garantir que a configuração log_bin_trust_function_creators esteja correta no seu contêiner Docker MySQL, siga estes passos:

### Instruções Passo a Passo
### Acesse o shell do MySQL e defina a variável log_bin_trust_function_creators:

    docker exec -it projeto-integrador-tecsus-backend-mysql-1 mysql -u root -p

    Entre com a senha root do MySQL (admin).

### Agora, no prompt do MySQL (dentro do Docker), defina a variável log_bin_trust_function_creators para 1:

    SET GLOBAL log_bin_trust_function_creators = 1;


### Verifique se as configurações funcionaram corretamente:

    SHOW VARIABLES LIKE 'log_bin_trust_function_creators';
    A saída deve confirmar que a variável está definida como 1.

### Depois de garantir que as funções e triggers podem ser criadas, crie as tabelas das entidades através do ddl abaixo:

    [ddl](https://github.com/quarks-team/Projeto-Integrador-TecSUS-Database/blob/main/script_banco_API_v.07.sql)

### Com todas as tabelas criadas, você pode criar as tabelas, triggers e funcões para os alertas e finalmente utilizar a aplicação!:

    [trgFunctions](https://github.com/quarks-team/Projeto-Integrador-TecSUS-Database/blob/main/trigger_alerta_consumo.sql)