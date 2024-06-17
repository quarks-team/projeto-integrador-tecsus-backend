# Tutorial de uso interativo do container do Mysql

## Iniciar o container com um shell interativo

```docker
docker run -it --entrypoint /bin/sh tecsusbackend-mysql:latest
```

## Acessar o MySQL

```docker
mysql -u admin -p
# Digite a senha: admin
```

## Acessar o Schema do projeto (banco de dados `db`)

```docker
USE db;
```

## Listar todas as tabelas

```docker
SHOW TABLES;
```

## Verificar todas as funções

```docker
SHOW FUNCTION STATUS WHERE Db = 'db';
```

## Verificar todos os triggers

```docker
SHOW TRIGGERS FROM db;
```

---
