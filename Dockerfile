# 1) Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy definition files and install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy source & create production build
COPY . .
RUN npm run build

# 2) Production stage
FROM nginx:alpine
# Remove default content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 (OpenShift will route to it)
EXPOSE 8080

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
