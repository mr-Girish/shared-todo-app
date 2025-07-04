# Dockerfile (frontend/Dockerfile)
FROM node:20-slim

WORKDIR /app

COPY . .

# Fix the optional dependency issue
RUN npm install --omit=optional

# Expose the Vite dev port
EXPOSE 5173

# Run dev server
CMD ["npm", "run", "dev"]
