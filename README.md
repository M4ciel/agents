# NLW Agents

Projeto desenvolvido por **Caio Maciel** durante o evento **NLW (Next Level Week) da Rocketseat**.

Este projeto consiste em uma aplicação full stack que permite criar e visualizar salas (rooms) de atendimento utilizando Fastify no backend e React com Vite no frontend.

---

## 🔧 Tecnologias e Bibliotecas

### Backend (Server)
- **[Fastify](https://fastify.dev/)** — framework HTTP leve e performático
- **[Zod](https://zod.dev/)** — validação de dados com tipagem
- **[fastify-cors](https://github.com/fastify/fastify-cors)** — configuração de CORS
- **[fastify-swagger](https://github.com/fastify/fastify-swagger)** — documentação da API
- **[dotenv](https://github.com/motdotla/dotenv)** — carregamento de variáveis de ambiente
- **PostgreSQL** — banco de dados relacional (conectado via `DATABASE_URL`)

### Frontend (Web)
- **[React](https://react.dev/)** + **[Vite](https://vitejs.dev/)** — estrutura moderna para SPA
- **[React Router](https://reactrouter.com/)** — roteamento
- **[React Query](https://tanstack.com/query/latest)** — gerenciamento de dados assíncronos

---

## 🧱 Padrões de Projeto

- **Monorepo** com `web/` e `server/` no mesmo repositório
- **Type-safe** do backend ao frontend com Zod
- **Documentação automática** da API via Swagger
- **Variáveis de ambiente** separadas por ambiente (`.env`, Vercel e Render)

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- Node.js 22+
- PostgreSQL rodando localmente
- Yarn ou npm

---

### 1. Clonar o repositório

```bash
git clone https://github.com/M4ciel/agents.git
cd agents
```

---

### 2. Banco de Dados (Docker)

```bash
cd docker
docker compose up --build -d
```

---

### 3. Backend (Server)

```bash
cd server
cp .env.example .env
# Edite o arquivo .env com sua DATABASE_URL
npm install
npx drizzle kit generate
npx drizzle kit migrate
npm run db:seed
npm run dev
```
A API estará disponível em `http://localhost:3333`

---

### 4. Frontend (Web)

```bash
cd ../web
cp .env.example .env
# Edite o VITE_API_URL com a URL da API
npm install
npm run dev
```
A interface estará em `http://localhost:5173`

---

### 🌐 Produção

- Backend e Banco de dados: hospedado na [Render](https://render.com/)
- Frontend: hospedado na [Vercel](https://vercel.com/)

---

### 📄 Licença

Projeto com fins educativos, desenvolvido durante o evento NLW da Rocketseat.
Autor: [Caio Maciel](https://www.linkedin.com/in/caio-maciel/)