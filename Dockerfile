FROM node:16.15.0-alpine AS builder
WORKDIR /app
ADD package*.json /app/
RUN npm install

FROM node:16.15.0-alpine
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
ADD . /app

# CMD ["npm", "run", "serve"]
CMD ["sh", "-c", "npm run db:migrate && npm run serve"]
