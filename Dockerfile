FROM node:12.14.1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
ENTRYPOINT [ "npm i" ]
CMD [ "npm", "start" ]