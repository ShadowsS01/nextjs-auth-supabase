# nextjs-auth-supabase

[![licence mit](https://img.shields.io/badge/licence-MIT-blue)](LICENSE)

> Um projeto com autenticação de usuários usando [Next.js](https://nextjs.org/) e [Supabase](https://supabase.com/)!

## Tecnologias e libs utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

- [Next.Js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [NProgress.js](https://ricostacruz.com/nprogress/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)

## Como executar o projeto

Para executar o projeto você precisa ter o [Node.js](https://nodejs.dev) e o [Git](https://git-scm.com) instalados na sua maquina. Você também precisará iniciar um projeto no [Supabase](https://supabase.com/) e de um editor de código, eu utilizei o [VSCode](https://code.visualstudio.com).

1. Clone esse repositório.

```bash
git clone https://github.com/ShadowsS01/nextjs-auth-supabase.git
```

2. Acesse a pasta do projeto.

```bash
cd nextjs-auth-supabase
```

3. Faça login e crie um projeto no [Supabase](https://supabase.com/), espere ele inicalizar. depois de iniciado, vá para 'settings > API' copie sua Anon_Public e Url.

4. Coloque sua Anon_Public e URL do seu Banco de Dados [Supabase](https://supabase.com/) em `.env.local` igual o `.env.local.example`.

```text
NEXT_PUBLIC_SUPABASE_URL=Cole a URL aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=Cole sua Anon_Public_Key aqui
```

5. Instale as dependências.

```bash
npm install
```

6. Execute a aplicação em modo de desenvolvimento.

```bash
npm run dev
```

## Licença

Este projeto esta sobe a licença [MIT](/LICENSE).
