FROM node:latest

WORKDIR /app

COPY package.json /app

# Install dependencies
RUN yarn install

COPY . /app

#Nodejs port 
EXPOSE 8080

RUN ["chmod", "+x" "/app/scripts/start.sh"]


ENTRYPOINT [ "/app/scripts/start.sh" ]
# Start Node server
# CMD [ "node", "server.js" ]