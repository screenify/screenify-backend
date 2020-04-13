FROM node:latest
# Download, installation of redis server.
RUN wget http://download.redis.io/redis-stable.tar.gz && \
    tar xvzf redis-stable.tar.gz && \
    cd redis-stable && \
    make && \
    mv src/redis-server /usr/bin/ && \
    cd .. && \
    rm -r redis-stable && \
    npm install -g concurrently   


WORKDIR /app

COPY package.json /app
# Install dependencies
RUN npm install

COPY . /app

#Nodejs port 
EXPOSE 8080

# Redis port
EXPOSE 6379

# Running Redis and Binding the ip , 
# Wait 5 seconds until redis is running...
# Start Node server
CMD concurrently "/usr/bin/redis-server --bind '0.0.0.0'" "sleep 5s; node /app/server.js"