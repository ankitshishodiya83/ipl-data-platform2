FROM node:24-alpine

WORKDIR /app

# Copy and install backend dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --production

# Go back to app root and copy frontend
WORKDIR /app
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install --production && npm run build

# Copy backend source code
COPY backend/src ./backend/src
COPY backend/prisma ./backend/prisma

# Set working directory back to app root
WORKDIR /app

# Expose port
EXPOSE 5000

# Start the backend server
CMD ["node", "backend/src/index.js"]
