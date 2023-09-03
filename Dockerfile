#offcial image for Node
FROM node:14 as build-stage

#Grab your code for docker to use and set working dir to copy all your code to
WORKDIR /app

#In docker every step (ie line) counts a seperate layer. 
#For efficiency docker will cache layers if nothings changed
#For this reason we want to install the node pack dependencies first 
#that way when we change the source code it wont have to reinstall all the dependancies again

#copy the package.json file to the working directory root
COPY package.json ./

RUN npm install

#copy all file from root dir of docker file to working dir
#node modules and build have been ignored as theyre not needed to be copied obviously
COPY . .

#set port env variable
ENV PORT=8080

#container to listen on port 8080
EXPOSE 8080

#command step to tell docker file how to run the application. Only one per file is allowed
CMD ["npm", "start"]

#build your container, -t is tag, and path for container to run in . means current dir
#docker build -t [dockerUserName]/[imageName]:[v] .

#run docker and -p 3002:8080 [imageGuid]