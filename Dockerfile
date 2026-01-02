# Build stage - needs ALL dependencies including devDependencies
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage - serve static files with 'serve'
FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
# Install serve globally to serve static files
RUN npm install -g serve
EXPOSE 8080
ENV PORT=8080
# Serve the built static files from dist folder
CMD ["serve", "-s", "dist", "-l", "8080"]
