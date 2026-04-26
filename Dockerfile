# Use Node base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Build app (only if needed, e.g., React)
RUN npm run build || true

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
