# Use Node base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining source code
COPY . .

# Expose app port (change if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
