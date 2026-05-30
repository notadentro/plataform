# Nota Dentro - Plataforma de Ensino Musical

Uma plataforma gamificada para aprendizado de teoria musical baseada no livro "Elementos de Teoria Musical" de Esther Scliar. O projeto está estruturado como um **Monorepo** utilizando **npm Workspaces**.

---

## 📁 Estrutura do Monorepo

O projeto está dividido em duas partes principais:

*   **`frontend/`**: Aplicação cliente construída com Next.js 15, React 18, Tailwind CSS, shadcn/ui e Genkit.
*   **`backend/`**: API de suporte e serviços inteligentes construída com Express, TypeScript, ts-node e Genkit.

---

## 🛠️ Tecnologias

### Frontend
- **Next.js 15 & React 18** - Framework e biblioteca de UI
- **Tailwind CSS & shadcn/ui** - Estilização moderna e componentes ricos
- **TypeScript** - Tipagem estática segura
- **Firebase** - Integração de autenticação, banco de dados (Firestore) e hospedagem
- **Genkit AI** - Integrações com IA para aprendizado interativo

### Backend
- **Express & Node.js** - Servidor web leve e flexível
- **TypeScript & ts-node** - Desenvolvimento tipado no backend
- **Genkit AI & Google GenAI** - Orquestração de modelos de inteligência artificial

---

## 🚀 Configuração e Execução Inicial

Por estarmos usando **npm Workspaces**, todas as dependências e scripts podem ser executados a partir da **raiz do projeto**!

### 1. Instalar Dependências (Tudo de uma vez)
Na pasta raiz (`c:\Users\carol\Desktop\plataform`), execute:
```bash
npm install
```
> **Nota:** Isso instalará de forma inteligente todas as dependências do frontend, backend e raiz em uma única pasta `node_modules` centralizada.

### 2. Configurar Variáveis de Ambiente
Tanto o frontend quanto o backend possuem seus arquivos de configuração:
- **Frontend**: configure o arquivo `.env` (ou `.env.local`) dentro da pasta `frontend/` com as suas chaves do Firebase e do Genkit.
- **Backend**: configure o arquivo `.env` dentro da pasta `backend/` com as chaves necessárias.

---

## 🎵 Executando o Projeto

Você pode rodar os ambientes de desenvolvimento diretamente da **raiz do projeto** usando os atalhos abaixo:

### Executar o Frontend (Next.js)
```bash
npm run dev
```
*(Atalho para `npm run dev -w frontend` — o frontend roda por padrão na porta `9002`)*

### Executar o Backend (Express API)
Abra um novo terminal na raiz e execute:
```bash
npm run dev:backend
```
*(Atalho para `npm run dev -w backend`)*

---

## 🎵 Diretrizes de Ensino e Currículo Musical (Esther Scliar)

O Nota Dentro baseia sua progressão pedagógica rigorosamente nos 30 capítulos do clássico **"Elementos de Teoria Musical"** de Esther Scliar. A plataforma gamifica conceitos complexos como:
- Figuras de duração e metrificação rítmica.
- Estruturas de escalas heptatônicas e diatônicas.
- Classificação e inversão de intervalos.
- Formação de tríades, tétrades e funções tonais.

---

*Desenvolvido com ❤️ para democratizar o acesso à teoria musical*
