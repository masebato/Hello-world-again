# Use an official Node.js image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port on which the application will be running
EXPOSE 3000

# Use a MySQL image as the base image
FROM mysql:8.0

# Set environment variables for the MySQL configuration
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=trips
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root

# Copy the SQL file with initial tables and data to the container
COPY initdb.sql /docker-entrypoint-initdb.d/

# Expose the port on which MySQL will be running
EXPOSE 3306

# Start the MySQL server when the container starts
CMD ["mysqld"]

# Start the application when the container starts
CMD ["npm", "start"]
