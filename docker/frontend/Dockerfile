FROM node:24.10.0-slim

RUN npm install -g pnpm

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN pnpm i

CMD ["pnpm", "dev"]
