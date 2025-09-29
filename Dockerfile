# 빌드 스테이지
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN apk add --no-cache --virtual .gyp python3 make g++ \
    && npm install -g pnpm \
    && pnpm install --frozen-lockfile \
    && apk del .gyp

COPY . .

RUN pnpm build

# 실행 스테이지
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]