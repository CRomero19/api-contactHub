# ContactHub API
Para iniciar a API basta clonar o repositório e em seguida seguir os passos abaixo:

1. Com o repositório clonado, instalar as package.json, ex:
  "npm install"
2. Agora abra um terminal e rode o comando psql para iniciar o postgres e então crie um banco de dados usando o comando CREATE DATABASE BANCO_DE_DADOS_PARA_CONTACT_HUB;
3. Após isso crie um arquivo com o nome de .env na diretório principal, nele iremos configurar localmente o banco de dados e o usuário, da seguinte forma:
  - DATABASE_URL="postgres://SEU_NOME_DE_USUÁRIO_POSTGRES:SUA_SENHA_DE_USUÁRIO_POSTGRES@localhost:5432/BANCO_DE_DADOS_PARA_CONTACT_HUB"
  - substitua as letras maiusculas por suas informações;
4. Agora iniciaremos as migrations para criar no banco de dados as entidades da aplicação, use os dois comandos na seguinte ordem:
  - npm run typeorm migration:generate -- -d src/data-source src/migrations/criandoEntidades  (criandoEntidades pode ser substituido pelo nome que quiser)
  - npm run typeorm migration:run -- -d src/data-source
5. Com tudo isso feito basta rodar o comando:
  "npm run dev"
