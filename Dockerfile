FROM node:latest

WORKDIR /app

COPY package.json /app

# Install dependencies
RUN yarn install

COPY . /app

#Nodejs port 
EXPOSE 8080

# Start Node server
CMD [ "node", "server.js" ]