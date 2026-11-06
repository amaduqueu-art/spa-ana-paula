This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy no Cloudflare Workers (OpenNext)

Este projeto usa [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare). Não use export estático: as rotas de API precisam de runtime.

### Pré-requisitos

- Node.js 20+
- Conta Cloudflare (`npx wrangler login`)
- Banco Neon e chave do Gemini já configurados

### 1. Variáveis locais

```bash
cp .env.example .env          # usado por `next dev`
cp .dev.vars.example .dev.vars # usado por `npm run preview` / Wrangler
```

Preencha os dois arquivos com os mesmos valores. Ambos são ignorados pelo Git.

### 2. Testar localmente no runtime do Workers

```bash
npm run preview
# http://localhost:8787
```

### 3. Configurar os secrets de produção

```bash
npx wrangler secret put DATABASE_URL
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put JWT_SECRET
npx wrangler secret put EMAIL_USER
npx wrangler secret put EMAIL_PASS
```

Use a connection string **com `-pooler`** do Neon.

### 4. Publicar

```bash
npm run deploy
```

### Observações

- `bcrypt` foi substituído por `bcryptjs` (JavaScript puro), pois o binário nativo não roda no Workers.
- `cacheComponents` e `partialPrefetching` ficam **desativados**: são incompatíveis com o `setTimeout` do runtime do Workers.
- O envio de e-mail usa SMTP do Gmail. Se falhar em produção, troque por uma API HTTP (Resend/Brevo).
- Para deploy automático via GitHub, configure na Cloudflare:
  - Build command: `npx opennextjs-cloudflare build`
  - Deploy command: `npx wrangler deploy`

