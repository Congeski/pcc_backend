# 📚 PCC Backend

Backend desenvolvido com [NestJS](https://nestjs.com/) para gerenciar funcionalidades relacionadas ao processo de **Controle de-Solicitações de Bancas PCC-UEM**.

---

## 🚀 Tecnologias Utilizadas

- **NestJS** — framework Node.js escalável e modular
- **TypeScript** — linguagem principal
- **Prisma ORM** — integração com banco de dados PostgreSQL
- **JWT (Passport.js)** — autenticação segura
- **AWS S3 & SES** — upload de arquivos e envio de e-mails
- **Docker & Docker Compose** — ambiente containerizado
- **Jest** — testes automatizados

---

## 📁 Estrutura de Diretórios

```bash
src/
├── auth/                    # Módulo de autenticação (JWT, estratégia, guardas)
├── decorators/              # Decoradores personalizados (ex: usuário logado)
├── modules/                 # Módulos de domínio: aluno, professor, email etc.
│   ├── aluno/
│   ├── programa-pos-graduacao/
│   ├── professor/
│   ├── email/
│   └── solicitacao-defesa/
├── service/                 # Serviços auxiliares (Prisma, Upload)
├── main.ts                  # Entry point
test/                        # Testes E2E com Jest
prisma/
├── schema.prisma            # Esquema do banco de dados
├── seed.ts                  # Script de seed
.env.example                 # Arquivo que contém as configurações de acesso ao banco e autenticação.
```

## ⚙️ Requisitos
- Node.js (v22+)
- Docker + Docker Compose
- PostgreSQL
- DBeaver (ferramenta de auxilio para acessar o banco de dados)
- Postman (para realizar as requisições)
- .env configurado (ver exemplo no arquivo .env.example)

## 🛠️ Instalação

```bash
# 1. Clone o repositório
git clone git@github.com:Congeski/pcc_backend.git ou https://github.com/Congeski/pcc_backend.git
cd pcc_backend

# 2. Rode a instalação dos pacotes
npm i

# 3. Crie o arquivo .env
cp .env.example .env

# 4. Execute o Docker

# 4. Suba o banco e rode as migrations + seed
npm run dev

# 5. Teste as rotas com Postman
```

🙋‍♂️ Contato
Desenvolvido pela equipe de backend da disciplina TOP. EM TEC. DE INFORMACAO E COMUN.
Alunos:
- Vinicius Congeski
- Paulo César
- Rafael Yudi
- Lucas Garcia
- Ryan Okonski
- Valdeir de Souza
- Victor Hugo
