# Desafio Luby - Node
## _Sistema de gerenciamento de loja de veículos_

## Principais tecnologias utilizadas

💠 [Node.js](https://nodejs.org/)

🔸 [Typescript](https://www.typescriptlang.org/)

🟡 [Sequelize](https://sequelize.org/)

✅ [Postgres](https://www.postgresql.org/)

🔆 [Express](https://expressjs.com/)

🔻 [Hapi](https://hapi.dev/)

## Descrição da solução
Foram utilizados conceitos de Clean Architecture no desenvolvimento do desafio, desacoplando o core da aplicação de suas ferramentas auxiliares (express, sequelize, postgres, hapi...). O servidor Hapi foi implementado apenas para mostrar o desacoplamento obtido.
As regras de negócio assumidas, além das exigidas, foram:
 - Funcionários podem ser administradores ou vendedores;
 - Qualquer um pode criar um novo funcionário e definir seu tipo;
 - Funcionários devem estar autenticados para realizar reservas, vendas, deleções e atualizações;
 - Apenas administradores podem deletar veículos ou outros funcionários;
 - Apenas o nome, email, senha, biografia e tipo podem ser atualizados em um funcionário;
 - Apenas adminstradores podem alterar o tipo de um funcionário;
 - Apenas admistradores podem "comprar" novos carros para a loja;
 - Não é possível vender e nem reservar um carro que já está com o status de "vendido";
 - Não é possível reservar um carro que já está com o status de "reservado", mas é possível vendê-lo;
 - Os GETs que retornam vetores possuem a paginação padrão como página 0 e tamanho 10, mas o usuário pode fornecer os parâmetros desejados pela query;
 
## Descrição das rotas da API
 - **GET /employees**: Retorna todos os funcionários; __Pública__
 - **GET /employees/:id**: Retorna um funcionário pelo seu ID e todas as suas reservas e vendas; __Pública__
 - **POST /employees**: Cria um novo funcionário; __Pública__
 - **POST /login/employees**: Retorna um JWT para autenticação do funcionário; __Pública__
 - **DELETE /employees/:id**: Deleta um funcionário pelo seu ID; __Privada__
 - **PUT /employees/:id**: Atualiza um funcionário pelo seu ID; __Privada__ 
 - **GET /vehicles**: Retorna todos os veículos; __Pública__ 
 - **GET /vehicles/:id**: Retorna um veículo pelo seu ID; __Pública__
 - **POST /vehicles**: Cria um novo veículo; __Privada__ 
 - **DELETE /vehicles/:id**: Deleta um veículo pelo seu ID; __Privada__
 - **GET /vehicles/filter/:status**: Retorna uma lista de veículos baseada no parâmetro status (1 - Disponível, 2 - Reservado, 3 - Vendido); __Pública__ 
 - **GET /employees/:id/sales**: Retorna a lista de vendas de um funcionário específico de forma mais detalhada; __Pública__ 
 - **POST /sales**: Cria uma nova venda; __Privada__
 - **GET /employees/:id/reservations**: Retorna a lista de reservas de um funcionário específico de forma mais detalhada; __Pública__
 - **POST /reservations**: Cria uma nova reserva; __Privada__

## Instruções para rodar o Teste Lógico proposto
Navegue para a pasta do projeto e atualize as dependências com o comando yarn

```sh
cd $path/desafio-luby
yarn
```

Rode o arquivo com yarn

```
yarn start:testelogico
```

## Instruções para rodar a API

__Necessário um banco de dados postgres (a não ser que mude o dialect do Sequelize) local__

Navegue para a pasta do projeto e atualize as dependências com o comando yarn

```sh
cd $path/desafio-luby
yarn
```

Inicie o servidor local com Express ou Hapi

```
yarn start:express
```
ou
```
yarn start:hapi
```
