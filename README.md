# StockFlow

> Projeto Ellewood

Sistema de gestão de estoque para micro e pequenos negócios. Desenvolvido para ser simples, adaptável e acessível para diferentes segmentos — vestuário, alimentício, industrial e tecnologia.

## 🚧 Status

Em desenvolvimento ativo.

## Tecnologias

- Next.js 16
- React
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Tailwind CSS

## Funcionalidades (MVP)

- [x] Autenticação com NextAuth (login/cadastro)
- [x] Cadastro de produtos com atributos dinâmicos
- [x] Dashboard com listagem de produtos
- [ ] Editar e deletar produtos
- [ ] Alerta de estoque baixo
- [ ] Gestão financeira
- [ ] Multi-negócio

## Como rodar localmente

Clone o repositório e instale as dependências:
git clone https://github.com/Karllyson-Paula/stockflow.git
cd stockflow
npm install

Configure o `.env` na raiz:
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/stockflow?schema=public"
NEXTAUTH_SECRET=sua-chave-secreta
NEXTAUTH_URL=http://localhost:3000

Rode as migrações e inicie o servidor:
npx prisma migrate dev
npm run dev

## Estrutura

```
app/
  api/              ← endpoints REST
  dashboard/        ← área logada
  login/            ← autenticação
components/         ← componentes reutilizáveis
lib/
  prisma.js         ← cliente do banco
  auth.js           ← configuração NextAuth
prisma/
  schema.prisma     ← modelos do banco
```
## Autor

Karllyson Eduardo — [@Karllyson-Paula](https://github.com/Karllyson-Paula)