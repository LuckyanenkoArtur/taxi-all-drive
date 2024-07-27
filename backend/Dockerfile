FROM node:21
RUN apt update

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g nodemon
COPY . ./
EXPOSE 5000
CMD ["npm", "run", "dev"]

# TODO: 1. Make to run with specific user not the root
# ! "USER" directive check !!!