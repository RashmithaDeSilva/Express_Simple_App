# Use an official Node.js runtime as a base image
FROM node:14

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Express and Express Validation
RUN npm install express express-validator cookie-parser express-session passport passport-local mongoose

# Copy the rest of the application code
COPY ./src .

# Expose the port the app runs on
EXPOSE 3001

# Serve the app
# CMD ["npm", "run", "start:dev"]