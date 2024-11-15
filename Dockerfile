# Stage 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy only the package.json and package-lock.json to install dependencies first
COPY package.json package-lock.json ./

# Clean the npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the application files
COPY . .

# Stage 2: Production image
FROM node:18-alpine AS production

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app .

# Optionally remove unnecessary development dependencies
RUN npm prune --production

EXPOSE 4000

# Run the app
CMD [ "npm", "run", "start:prod" ]
