# Stage 1: Build the frontend
FROM node:20.9.0-alpine as frontend-builder

# Set working directory for frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json for frontend
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY frontend .

# Build the frontend
RUN npm run build

# Stage 2: Setup the backend
FROM node:20.9.0-alpine

# Set working directory for backend
WORKDIR /app/backend

# Copy package.json and package-lock.json for backend
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source code
COPY backend .

# Copy built frontend files from frontend-builder stage
COPY --from=frontend-builder /app/frontend/dist /app/backend/frontend/dist

# Expose the port the backend listens on
EXPOSE 8080

# Command to run the backend
CMD ["npm", "start"]