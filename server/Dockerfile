# Use the official Node.js image as a base image
FROM node:16


# # Set a build argument for the environment variable
# ARG CONNECTION_STRING
# # Set the environment variable in the container
# ENV CONNECTION_STRING=$CONNECTION_STRING 
# ARG VITE_TinyMCE_KEY
# # Set the environment variable in the container
# ENV VITE_TinyMCE_KEY=$VITE_TinyMCE_KEY 

    
# Create a directory for the Node.js server code
WORKDIR /app

COPY package*.json ./

# Copy the Node.js server code into the container source . (picking up all files of currentDir) . dest
COPY . .    

# Install the dependencies
RUN npm install

# Expose the necessary ports
EXPOSE 3000

# Start the Node.js server
CMD node server.js