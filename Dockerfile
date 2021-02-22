FROM node:latest

WORKDIR /app

COPY package.json /app

# Install dependencies
RUN yarn install

COPY . /app

#Nodejs port 
EXPOSE 8080

RUN ./script/generate_service_keys 

# Start Node server
CMD [ "node", "server.js" ]