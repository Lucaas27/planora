# Build stage
FROM node:lts-alpine as build
WORKDIR /app

# Copy package files and install dependencies
COPY client/package*.json ./
RUN npm ci

# Copy source code
COPY client/ ./

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy built files from build stage to nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
