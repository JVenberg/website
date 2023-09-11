FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add openjdk11
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk/
RUN export JAVA_HOME

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD [ "npm", "start" ]
