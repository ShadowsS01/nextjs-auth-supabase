# nextjs-auth-supabase

[![licence mit](https://img.shields.io/badge/licence-MIT-blue)](LICENSE)

> Um projeto com autenticação de usuários usando [Next.js](https://nextjs.org/) e [Supabase](https://supabase.com/)!

## Tecnologias utilizadas

- Frontend:
  - [Next.js](https://github.com/vercel/next.js) - um framework React para produção.
  - [NProgress.js](https://ricostacruz.com/nprogress/) - Uma barra de progresso nanoscópica.
  - [Tailwind CSS](https://tailwindcss.com/) - Uma estrutura CSS de utilidade para o desenvolvimento rápido de interface do usuário.
  - [Headless UI](https://headlessui.dev/) - Componentes de interface do usuário totalmente sem estilo e totalmente acessíveis.
  - [Supabase.js](https://supabase.com/docs/library/getting-started) para gerenciamento de usuários e sincronização de dados em tempo real.
- Backend:
  - [app.supabase.io](https://app.supabase.io/): banco de dados Postgres hospedado com API restful para uso com Supabase.js.

## Demo

[https://nextjs-auth-supabase.vercel.app/](https://nextjs-auth-supabase.vercel.app/)

## Como executar o projeto

Para executar o projeto você precisa ter o [Node.js](https://nodejs.dev) e o [Git](https://git-scm.com) instalados na sua maquina. Você também precisará de um editor de código, eu utilizei o [VSCode](https://code.visualstudio.com).

### 1. Configurando o [Supabase](https://app.supabase.io/)

- Faça login e crie um projeto no [Supabase](https://app.supabase.io/). Aguarde o início do banco de dados.

- Depois que seu banco de dados for iniciado, execute o início rápido "User Management Starter". Dentro do seu projeto, entre na guia do `editor SQL` e role para baixo até ver `User Management Starter: Configure uma tabela de perfis públicos que você pode acessar com sua API`.

### 2. Pegando a URL e a Key:

Agora, vá para as configurações do projeto (o ícone de engrenagem), abra a guia API e encontre a URL da API e a key anon, você precisará deles na [etapa 5](#5-configurar-vari%C3%A1veis-de-ambiente).

### 3. Clone esse repositório.

```bash
git clone https://github.com/ShadowsS01/nextjs-auth-supabase.git
```

### 4. Acesse a pasta do projeto.

```bash
cd nextjs-auth-supabase
```

### 5. Configurar variáveis de ambiente

Copie o arquivo `.env.local.example` neste diretório para `.env.local` (que será ignorado pelo Git):

```bash
cp .env.local.example .env.local
```
- Se der errado o `cp` crie o arquivo `.env.local` nesta pasta.

Em seguida, defina cada variável em `.env.local` com a URL e a key obtida na [Etapa 2](#2-pegando-a-url-e-a-key):

```text
NEXT_PUBLIC_SUPABASE_URL=Cole a URL aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=Cole sua Anon_Public_Key aqui
```

### 6. Instale as dependências.

```bash
npm install
```

### 7. Execute a aplicação em modo de desenvolvimento.

```bash
npm run dev
```

## Faça o seu próprio Deploy

Depois de ter acesso às [variáveis de ambiente necessárias](#5-configurar-variáveis-de-ambiente), implante o exemplo usando o [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/ShadowsS01/nextjs-auth-supabase.git&project-name=nextjs-auth-supabase&repository-name=nextjs-auth-supabase&demo-title=NextJs%20Auth%20Supabase&demo-description=Um%20exemplo%20de%20aplicativo%20da%20Web%20usando%20Supabase%20e%20Next.js&demo-url=https://nextjs-auth-supabase.vercel.app/&demo-image=https://repository-images.githubusercontent.com/474755214/bc35a29f-3129-4680-9668-092bc41449cd&env=NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_SUPABASE_URL&envDescription=Necessário%20para%20conectar%20o%20aplicativo%20com%20o%20Supabase&envLink=https://github.com/ShadowsS01/nextjs-auth-supabase#2-pegando-a-url-e-a-key)

## Créditos

> Este projeto teve como base o [`nextjs-ts-user-management`](https://github.com/supabase/supabase/tree/master/examples/nextjs-ts-user-management)

## Licença

Este projeto esta sobe a licença [MIT](/LICENSE).
