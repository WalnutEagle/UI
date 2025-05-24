# ────────────────
# 1) Build stage
# ────────────────
FROM node:18-alpine AS builder
WORKDIR /app

# Install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy source & build
COPY . .
RUN npm run build

# ────────────────
# 2) Production stage
# ────────────────
FROM nginx:alpine

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Ensure Nginx cache dirs exist and are group-writable
RUN mkdir -p \
      /var/cache/nginx/client_temp \
      /var/cache/nginx/proxy_temp \
      /var/cache/nginx/fastcgi_temp \
      /var/cache/nginx/uwsgi_temp \
      /var/cache/nginx/scgi_temp \
  && chown -R 0:0 /var/cache/nginx \
  && chmod -R g+w  /var/cache/nginx

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port OpenShift routes to
EXPOSE 8080

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
