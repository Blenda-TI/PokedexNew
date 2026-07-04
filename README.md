# Pokédex

Aplicação web para criação, edição e gerenciamento de cards de Pokémon em estilo de carta colecionável (TCG), com autenticação de usuários e persistência em banco de dados PostgreSQL.

## Tecnologias utilizadas

- **[Next.js 16](https://nextjs.org/)** (App Router + Turbopack)
- **[NextAuth.js](https://next-auth.js.org/)** — autenticação via Credentials Provider
- **[Prisma ORM 7](https://www.prisma.io/)** — com driver adapter para PostgreSQL
- **[PostgreSQL](https://www.postgresql.org/)** hospedado no [Neon](https://neon.tech/)
- **bcrypt** — criptografia de senhas
- **CSS Modules** — estilização

---

## Requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)
- Uma instância de banco de dados PostgreSQL (recomendado: [Neon](https://neon.tech/), possui plano gratuito)

---

## Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd poke
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente (veja a seção [Variáveis de Ambiente](#variáveis-de-ambiente) abaixo).

4. Gere o Prisma Client:

   ```bash
   npx prisma generate
   ```

5. Rode as migrations para criar as tabelas no banco de dados:

   ```bash
   npx prisma migrate dev
   ```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# String de conexão do banco de dados PostgreSQL (ex: Neon)
DATABASE_URL="postgresql://usuario:senha@host/nome_do_banco?sslmode=require"

# URL base da aplicação (usada pelo NextAuth)
NEXTAUTH_URL="http://localhost:3000"

# Chave secreta usada pelo NextAuth para assinar tokens JWT
# Gere uma com: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
NEXTAUTH_SECRET="sua_chave_secreta_aqui"
```

| Variável          | Descrição                                                                 |
|-------------------|----------------------------------------------------------------------------|
| `DATABASE_URL`    | String de conexão do banco PostgreSQL utilizado pelo Prisma               |
| `NEXTAUTH_URL`    | URL onde a aplicação está rodando (local ou produção)                     |
| `NEXTAUTH_SECRET` | Chave secreta para criptografia de sessão/token JWT do NextAuth           |

> ⚠️ **Nunca** faça commit do arquivo `.env` no controle de versão. Ele já deve estar listado no `.gitignore`.

---

## Execução

### Ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

### Build de produção

```bash
npm run build
npm run start
```

---

## Funcionalidades

- **Autenticação**
  - Cadastro de usuário (`/cadastro`) com senha criptografada via `bcrypt`
  - Login de usuário (`/login`) via NextAuth (Credentials Provider)
  - Sessão gerenciada por JWT
  - Rotas protegidas: páginas do dashboard e endpoints de API só são acessíveis por usuários autenticados

- **CRUD de Cards Pokémon**
  - Criar novo card (nome, tipo, HP, ataque principal, descrição, imagem, raridade)
  - Listar todos os cards do usuário autenticado
  - Editar um card existente
  - Excluir um card
  - Buscar cards pelo nome

---

## Estrutura do projeto

```
poke/
├── prisma/
│   ├── schema.prisma           # Definição dos models (User, Pokemon) e datasource
│   └── migrations/             # Histórico de migrations do banco de dados
├── prisma.config.ts             # Configuração do Prisma (schema e conexão)
├── public/                      # Arquivos estáticos (imagens, ícones)
├── src/
│   ├── proxy.js                 # Proteção de rotas (equivalente ao middleware)
│   ├── lib/
│   │   └── prisma.js            # Instância singleton do Prisma Client
│   ├── generated/
│   │   └── prisma/              # Prisma Client gerado automaticamente (não editar)
│   └── app/
│       ├── layout.js            # Layout raiz da aplicação
│       ├── globals.css          # Estilos globais
│       ├── auth.module.css      # Estilos compartilhados das telas de login/cadastro
│       │
│       ├── login/
│       │   └── page.jsx         # Tela de login
│       │
│       ├── cadastro/
│       │   └── page.jsx         # Tela de cadastro de usuário
│       │
│       ├── dashboard/
│       │   ├── page.jsx         # Dashboard: listagem, busca e exclusão de cards
│       │   ├── dashboard.module.css
│       │   ├── novo/
│       │   │   ├── page.jsx     # Formulário de criação de card
│       │   │   └── form.module.css
│       │   └── editar/
│       │       └── [id]/
│       │           └── page.jsx # Formulário de edição de card
│       │
│       ├── components/
│       │   ├── PokemonCard.jsx          # Componente visual do card de Pokémon
│       │   └── PokemonCard.module.css
│       │
│       └── api/
│           ├── auth/
│           │   └── [...nextauth]/
│           │       └── route.js         # Configuração do NextAuth (providers, callbacks)
│           ├── register/
│           │   └── route.js             # Endpoint de cadastro de usuário
│           └── pokemons/
│               ├── route.js             # GET (listar/buscar) e POST (criar) cards
│               └── [id]/
│                   └── route.js         # GET, PUT e DELETE de um card específico
│
├── .env                          # Variáveis de ambiente (não versionado)
├── package.json
└── README.md
```

---

## Modelo de dados

### User

| Campo       | Tipo     | Descrição                          |
|-------------|----------|--------------------------------------|
| `id`        | String   | Identificador único (cuid)          |
| `name`      | String?  | Nome do usuário                     |
| `email`     | String   | E-mail (único)                      |
| `password`  | String   | Senha criptografada (bcrypt)        |
| `createdAt` | DateTime | Data de criação da conta            |
| `pokemons`  | Pokemon[]| Cards criados pelo usuário          |

### Pokemon

| Campo         | Tipo     | Descrição                                 |
|---------------|----------|--------------------------------------------|
| `id`          | String   | Identificador único (cuid)                |
| `name`        | String   | Nome do Pokémon                           |
| `type`        | String   | Tipo (Fogo, Água, Planta, etc.)           |
| `hp`          | Int      | Pontos de vida                            |
| `attack`      | String   | Nome do ataque principal                  |
| `description` | String?  | Descrição/lore do Pokémon                 |
| `imageUrl`    | String?  | URL da imagem do card                     |
| `rarity`      | String?  | Raridade (Comum, Incomum, Raro)           |
| `userId`      | String   | Referência ao usuário dono do card        |
| `createdAt`   | DateTime | Data de criação do card                   |

---

## Autor

Desenvolvido por Blenda Moreira, como parte de um projeto acadêmico na FAETERJ Barra Mansa, sob orientação do professor Vinicius.