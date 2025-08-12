# Simple single-stage build
FROM node:20-alpine

# Install build dependencies for native modules
RUN sed -i 's/https/http/g' /etc/apk/repositories && \
    apk update && \
    apk add --no-cache python3 make g++ libc6-compat

WORKDIR /app

# Copy package files
COPY package*.json ./

# Add this line before npm install commands
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false
RUN npm config set registry "https://registry.npmjs.org/"

# Install dependencies and rebuild native modules for Alpine
RUN npm install 
RUN npm i sqlite3 better-sqlite3

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