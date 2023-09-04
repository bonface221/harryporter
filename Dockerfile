# build stage
# Choose the Image which has Node installed already
FROM node:18.16-alpine as build-stage

# make the 'intsp' folder the current working directory
WORKDIR /harry

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install --legacy-peer-deps

# copy project files and folders to the current working directory (i.e. 'intsp' folder)
COPY . .

# build app for production with minification
RUN npm run build

# production stage
# Choose the nginx image 
FROM nginx:stable-alpine as production-stage

# Copy the necessary folder "/intsp/dist" to the nginx/html dir
COPY --from=build-stage /harry/dist /usr/share/nginx/html

# specifies that the container will listen on port 80
EXPOSE 80

# specifies the command to run when the Docker image is started 
CMD ["nginx", "-g", "daemon off;"]