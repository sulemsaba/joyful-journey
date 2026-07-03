# ─── Stage 1: builder ───────────────────────────────────────────────────

FROM node:20-alpine AS builder

RUN apk add --no-cache curl bash && npm install -g bun

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile || bun install

COPY . .

RUN bun run build

# ─── Stage 2: nginx runner ──────────────────────────────────────────────

FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
