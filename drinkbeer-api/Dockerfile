FROM node:20-alpine AS base

WORKDIR /app
RUN corepack enable
COPY package.json  pnpm-lock.yaml ./

FROM base AS development

RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 8080
ENV NODE_ENV=development
ENV CHOKIBAR_USEPOLLING=true
CMD ["pnpm", "run", "start:dev"]

FROM base AS production

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY src ./src
EXPOSE 3000
CMD ["pnpm", "run", "start:prod"]
