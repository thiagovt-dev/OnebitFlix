
# Api OnebitFlix

Esse é um projeto de api para o projeto final do curso FullStack da Onebitecode. O projeto é uma especie de EAD de cursos com um design baseado na Netflix. [Clique aqui](https://github.com/thiagovt-dev/onebitflix_frontend) e acesse o repositorio do frontend do projeto


## Stack utilizada

Esse projeto foi desenvolvido utilizando:

**Node** com **Typescript** e **Javascript**. Foi construido o banco de dados SQL usando **PostgresSQL**

E os frameworks:

**. Express.js**

**. Sequelize**

**. Admin.js**

**. Bcrypt**

**. JWT**

## Documentação

Originalmente, o projeto consistia em utilizar a versão 6 do Admin.js, contudo ela ja está ultrapassada e então resolvi usar a versão 7 que é a mais atual até o momento. O Admin.js é um framework que cria uma pagina administrativa, facilitando o desenvolvimento. [Confira aqui a documentação](https://docs.adminjs.co/installation/getting-started?_gl=1*1byqx7*_gcl_au*NTc3MDU5MjU1LjE3MDY0NjI3Mjc).

O Adminjs v7 somente permite a utilização do ESmodule e você deve setar adicionar **"module": "NodeNext"** e **"moduleResolution": "nodenext"** ao seu tsconfig. 

Devido a essa mudança precisei fazer algumas modificações, principalmente nos arquivos que necessitavam de commonJS, como no caso das migration. Para evitar esses erros, somente precisei alterar a extenção do arquivo de **.js** para **.cjs**.

O Bcrypt foi usado para criptografar a senha criada pelos usuarios e o JWT que é o Json Web Token, usado para autenticar as entradas do usuário.

Para rodar a aplicação em ambiente de desenvolvimente, o projeto original consistia em usar o **ts-node-dev**, porém esse pacote ainda não funciona muita bem com ESmodule. Para rodar em ambiente de desenvolvimente, a solução que encontrei foi utilizar o **nodemon** junto com o **ts-node**, faça assim:







## Rodando localmente

Clone o repositorio

```bash
  git clone thiagovt-dev/OnebitFlix_backend
```

Navegue até o diretório do projeto

```bash
  cd onebitFlix_backend
```

Instale as dependências

```bash
  npm install
```

Certifique-se que o **nodemon** e o **ts-node** foram isntalador

```bash
  npm i nodemon ts-node
```

Inicie o servidor local com 

```bash
  nodemon --no-warnings -I --exec node --loader ts-node/esm src/server.ts
```

Ou adicione o script "dev" ao seu package.json e rode

```bash
    npm run dev
```


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL = ` url do seu database

`ADMINJS_COOKIE_PASSWORD = ` senha do cookie do Admin.js

`JWT_KEY =` chave de autenticação do JWT 

Para evitar erros de tipagem do Typescript utilizei o pacote env-var e criei um arquivo chamado enviromment.ts. Confira o arquivo em src/config/enviromment.ts

## Conclusão

Por fim, o projeto foi excelente para por em prática os estudos e o desenvolvimento backend. Como o projeto se trata de fins puramente acadêmicos, eu fiz o deploy desta aplicação no [Render](https://render.com/) usando o plano gratuito e o banco de dados PostgreSQL foi hospedado na [Neon](https://neon.tech/) também de forma gratuita.
