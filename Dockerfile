FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 5173
RUN npm ci --only=production
CMD [ "npm", "run", "dev" ]
