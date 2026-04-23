version: '3.8'

services:
  vaultcase:
    build: .
    ports:
      - "3000:80"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
