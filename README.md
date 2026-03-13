# Raad Oil — Static Site (Vite + Tailwind) + Vercel Email

This project is a static multi-page site built with **Vite + Tailwind CSS** (compiled for best performance),
and a **Vercel Serverless Function** (`/api/contact`) that sends contact emails via **Resend**.

## 1) Prerequisites
- Node.js 18+ installed
- A GitHub account
- A Vercel account
- A Resend account (free tier)

## 2) Install & run locally
```bash
npm install
npm run dev
```

## 3) Put your images
Copy your existing Laravel `public/images` folder to:
- `public/images` (create `public/` if missing)

Any `/images/...` references will work.

If you have a PDF catalog, place it at:
- `public/catalog.pdf`

## 4) Configure email (Resend)
1. Create an account on Resend and get an API key.
2. Add a **verified sender** (or use the default `onboarding@resend.dev` for testing).

### Local env
Create a file named `.env.local` in the project root:
```bash
RESEND_API_KEY=your_resend_key
CONTACT_TO_EMAIL=you@yourcompany.com
# Optional:
CONTACT_FROM_EMAIL=Raad Oil <onboarding@resend.dev>
CONTACT_SUBJECT=New message from Raad Oil website
```

## 5) Build
```bash
npm run build
npm run preview
```

## 6) Deploy to Vercel
1. Push this project to GitHub.
2. In Vercel: **Add New → Project → Import** your GitHub repo.
3. Framework preset: **Vite** (auto-detected)
4. Deploy.

## 7) Add environment variables in Vercel
In Vercel: **Project → Settings → Environment Variables**
Add:
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
Optional:
- `CONTACT_FROM_EMAIL`
- `CONTACT_SUBJECT`

Redeploy after adding env vars.

## 8) Connect Raad Oil domain
In Vercel: **Project → Settings → Domains → Add**
- Add `raadoil.com` (or your real domain)
- Add `www.raadoil.com` (recommended)

Vercel will show you the exact DNS records to add at your registrar:
- Typically an **A record** for apex domain
- A **CNAME** for `www`

Once DNS propagates, Vercel will auto-issue SSL.

## Notes
- Pages are at the root: `index.html`, `products.html`, etc.
- Contact form posts to `/api/contact` (serverless). No database needed.
