FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built files
COPY dist/ ./dist/
COPY README.md LICENSE ./

# Run the MCP server
# Set CRAWLEO_API_KEY environment variable when running the container
ENTRYPOINT ["node", "dist/index.js"]
