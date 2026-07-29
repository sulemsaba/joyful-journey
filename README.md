# exxonim-consult-frontend

Public website for Exxonim Consult — business setup, compliance, and advisory services in Tanzania.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- Axios

## Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run preview    # preview build locally
npm run lint       # lint check
```

## Environment

Copy `.env.example` to `.env` and fill in the backend URL.

```bash
cp .env.example .env
```

## Deploy

Build output goes to `dist/`. Point your reverse proxy (Caddy / Nginx) at the built files.

Docker is available via the project Dockerfile.
