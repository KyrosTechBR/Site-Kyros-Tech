# Kyros Tech

Site institucional profissional da Kyros Tech, criado com Next.js, TypeScript, React, Tailwind CSS e App Router.

## Tecnologias

- Next.js 16 com App Router
- TypeScript
- React
- Tailwind CSS
- ESLint
- Lucide React
- Framer Motion
- React Hook Form
- Zod

## Requisitos

- Node.js LTS
- npm

## Comandos principais

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Build e produção

```bash
npm run build
npm run start
```

## Variáveis de ambiente

Crie `.env.local` com base em `.env.example`.

```bash
NEXT_PUBLIC_SITE_URL=https://www.seudomínio.com.br
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

`NEXT_PUBLIC_WHATSAPP_NUMBER` é opcional. Se não estiver configurada, o botão de WhatsApp não é exibido.

## Dados da empresa

Edite `src/config/site.ts` para alterar:

- nome, slogan e descrição
- URL do site
- e-mail
- telefone
- WhatsApp
- redes sociais
- horário de atendimento
- endereço futuro

Não coloque chaves privadas em variáveis `NEXT_PUBLIC_`.

## Logo

A estrutura está preparada para receber:

- `public/logo-kyros.svg`
- `public/logo-kyros.png`
- `public/logo-kyros-white.svg`

Enquanto a logo oficial não existir, o componente `src/components/layout/Logo.tsx` usa uma marca textual com símbolo abstrato.

## Cores

Os tokens principais ficam em `src/app/globals.css`, dentro de `:root`.

## Formulario

O formulário usa React Hook Form e Zod. A API fica em `src/app/api/contato/route.ts`.

Neste primeiro momento, os dados são validados no cliente e no servidor, e um payload seguro e reduzido é registrado no terminal pelo serviço `src/services/contact-service.ts`.

Esse serviço foi separado para futuras integrações com Supabase, PostgreSQL, Resend, Nodemailer, CRM ou WhatsApp.

## Rotas

- `/`
- `/solucoes`
- `/kyros-clock`
- `/agendabky`
- `/desenvolvimento-de-sites`
- `/automacao-de-processos`
- `/sobre`
- `/contato`
- `/politica-de-privacidade`
- `/termos-de-uso`

## SEO

O projeto usa Metadata API do Next.js, sitemap, robots, manifest e dados estruturados Schema.org para Organization, WebSite, SoftwareApplication e FAQPage.

## Deploy na Vercel

1. Envie o repositório para um Git remoto.
2. Importe o projeto na Vercel.
3. Configure as variáveis de ambiente.
4. Use o build padrão do Next.js.

## Deploy em Ubuntu com Nginx e PM2

Exemplo considerando `/var/www/kyrostech`:

```bash
sudo apt update
sudo apt install -y nodejs npm nginx ufw
sudo npm install -g pm2
cd /var/www/kyrostech
npm install
npm run build
pm2 start npm --name kyrostech -- start
pm2 save
pm2 startup
```

Copie e ajuste `docs/nginx-kyrostech.conf` para `/etc/nginx/sites-available/kyrostech`.

```bash
sudo ln -s /etc/nginx/sites-available/kyrostech /etc/nginx/sites-enabled/kyrostech
sudo nginx -t
sudo systemctl reload nginx
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seu-domínio.com.br -d www.seu-domínio.com.br
```

Não execute comandos destrutivos no servidor sem backup e revisão.

## Estrutura principal

```text
src/
  app/
  components/
  config/
  data/
  lib/
  services/
docs/
public/
```

## Pendências antes da publicação oficial

- Informar e-mail, telefone, redes sociais e domínio oficiais.
- Revisar política de privacidade e termos com apoio jurídico.
- Substituir a logo temporaria pela identidade visual oficial.
- Configurar destino real do formulário.
- Configurar analytics somente se houver base legal e aviso adequado.
