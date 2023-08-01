FROM node:16-alpine as development

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . ./

# Build the application
RUN npm run build

FROM node:16-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=80
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
# Run the web service on container startup.
CMD [ "npm", "run", "start:prod" ]