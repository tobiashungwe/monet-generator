# Use the official Node.js image from the Docker Hub
FROM node:16-slim as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Use the official Nginx image to serve the build files
FROM nginx:stable-alpine

# Copy the build files from the previous stage into the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
