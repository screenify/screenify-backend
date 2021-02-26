FROM node:latest

WORKDIR /app

COPY package.json /app

COPY scripts/start.sh /app

# Install dependencies
RUN yarn install

COPY . /app

ARG GOOGLE_PROJECT_ID
ARG GOOGLE_BUCKET_NAME
ARG GOOGLE_PRIVATE_KEY_ID
ARG GOOGLE_PRIVATE_KEY
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_EMAIL

#Nodejs port 
EXPOSE 8080

RUN ["chmod", "+x", "/app/start.sh"]
RUN /app/start.sh $GOOGLE_PROJECT_ID  $GOOGLE_PRIVATE_KEY_ID $GOOGLE_PRIVATE_KEY $GOOGLE_CLIENT_ID $GOOGLE_CLIENT_EMAIL $GOOGLE_BUCKET_NAME


# ENTRYPOINT [ "/app/scripts/start.sh" ]
# Start Node server
CMD [ "node", "/app/server.js" ]