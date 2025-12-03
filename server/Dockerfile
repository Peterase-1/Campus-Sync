# Use stable Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install OpenSSL 1.1.1 compatibility if needed for Prisma on Alpine
# (Prisma usually handles this, but sometimes explicit install helps on older alpine versions or specific prisma versions)
# For node:18-alpine (which is usually Alpine 3.17+), openssl is usually sufficient.
# We will install openssl to be safe.
RUN apk add --no-cache openssl

# Copy package files first to leverage cache
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the TypeScript application
RUN npm run build

# Expose the application port
EXPOSE 4000

# Start the application with migration
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
