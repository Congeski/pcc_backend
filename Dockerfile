# Dockerfile
FROM node:22.17.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Gera o client Prisma antes de buildar o projeto Nest
RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start:prod"]
