FROM node:alpine

#copy source
VOLUME ["/code"]
WORKDIR /code

# Install deps
COPY package.json .
RUN npm install

# Build
#RUN npm run build

#ENTRYPOINT [ "npm", "run", "dev" ]