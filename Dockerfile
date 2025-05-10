# --- Build stage ---
FROM node:23-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
COPY . .

# Accept build-time env variable and inject it into Vite
ARG VITE_TMDB_API_KEY
ENV VITE_TMDB_API_KEY=$VITE_TMDB_API_KEY

# Optional: log the key (for debugging only — remove after confirming)
RUN echo "Building with TMDB key: $VITE_TMDB_API_KEY"

# Build your Vite app
RUN npm run build

# --- Production stage ---
FROM nginx:alpine

# Copy built files to NGINX public dir
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
