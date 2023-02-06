# Desafio Fullstack

> Essa atividade faz parte do sexto módulo da formação em desenvolvimento Fullstack da Kenzie Academy Brasil.
 <br />
 
## 💻 Back-End

### 🧱 Features da aplicação
```bash
>Cadastro de usuário
>Cadastro de contatos
>Login
>Listagem de contatos
>Adição, edição e exclusão de usuário e/ou contatos
```

&nbsp;
### 🛠 Ferramentas utilizadas
```bash
>GitHub
>Figma
>VSCode
>Insomnia
>Express
>NodeJS
>PostgreSQL
>Sqlite3
>TypeORM
>TypeScript
>BCryptjs
>Jsonwebtoken
>Pg
>Reflect-metadata
>Dotenv
>Cross-env
>Class-transformer
>epress-async-errors
>Relacionamentos
>Ts-Jest
>Supertest
```
 
 &nbsp;

### 🔧 Configuração do ambiente


* Faça o clone do repositório para sua máquina

* Acesse seu terminal e dentro da pasta do projeto rode o comando yarn para instalar todas as dependências do projeto

```bash
  yarn 
```

* Para rodar a aplicação use yarn dev 

```bash
  yarn dev
```

* Em seguida, crie um arquivo .env, copiando o formato do arquivo .env.example; Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

```bash
 cp .env.example .env
```

* Execute as migrations com o comando:

```bash
 yarn typeorm migration:run -d src/data-source.ts
```

* Para rodar os testes utilize o comando:
```bash
  yarn test --verbose
```

<br />
 
 
&nbsp;
## 💅 Front-End
[Clique aqui](https://www.figma.com/file/0jy9WmPJwm0c6v5wEnYAKI/Untitled?node-id=0%3A1&t=E0Zn7fSJjztwNawO-0) para acessar o Figma da aplicação.


<br />

[ Voltar para o topo ](#desafio-fullstack)
