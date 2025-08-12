# Simple single-stage build
FROM node:20-alpine

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++ libc6-compat

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and rebuild native modules for Alpine
RUN npm install

# Copy source code
COPY . .

# Rebuild native modules for Alpine (if needed)
RUN npm rebuild

# Setup database
RUN node ./scripts/setup-db.js

# Build the Next.js app (creates .next/standalone)
RUN npm run build


EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the optimized standalone app
CMD ["npm", "start"]