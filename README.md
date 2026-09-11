# StockFlow

> Projeto Neves

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
- [x] Cadastro de produtos com variantes (tamanho, cor, gênero, tecido)
- [x] Preço por variante — suporte a preços diferenciados para tamanhos plus size
- [x] Upsert de produtos — variantes adicionadas ao produto existente ao recadastrar
- [x] Mescla de variantes duplicadas — soma quantidade ao recadastrar variante idêntica
- [x] Dashboard com listagem de produtos e variantes
- [x] Busca por nome do produto em tempo real
- [x] Filtro dinâmico por categoria
- [x] Ordenação de produtos por nome
- [x] Deletar produto completo (com confirmação)
- [x] Deletar variante individual (com confirmação)
- [x] Editar produto e variantes
- [x] Carrinho de saída — registrar vendas com múltiplos itens de uma vez
- [x] Baixa de estoque automática ao confirmar venda
- [x] Alerta de estoque baixo com detalhes das variantes afetadas
- [x] Interface minimalista responsiva com Tailwind CSS
- [ ] Fluxo de cadastro completo (negócio + usuário na mesma tela)
- [ ] Gestão financeira
- [ ] Multi-negócio

## Como rodar localmente

```
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
```

## Estrutura

```
app/
  api/
    produtos/         ← CRUD de produtos e variantes
    vendas/           ← registrar saída de estoque
    negocios/         ← CRUD de negócios
    usuarios/         ← cadastro de usuários
    auth/             ← NextAuth
  dashboard/
    produtos/novo/    ← cadastro de produto
    produtos/[id]/    ← editar produto
  login/              ← autenticação
components/
  CarrinhoSaida.js   ← carrinho de saída com baixa de estoque
  FormEditarProduto.js ← formulário de edição de produto
  ListaProdutos.js   ← listagem com busca, filtro e deleção
  Navbar.js          ← navegação com logout
  Providers.js       ← SessionProvider
lib/
  prisma.js          ← cliente do banco
  auth.js            ← configuração NextAuth
prisma/
  schema.prisma      ← modelos do banco
```

## Autor

Karllyson Eduardo — [@Karllyson-Paula](https://github.com/Karllyson-Paula)