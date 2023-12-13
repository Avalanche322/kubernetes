# Use the official Node.js image as a base image
FROM node:20.10.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app (assuming you have a build script in your package.json)
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
