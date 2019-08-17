FROM  node:alpine
USER root
RUN apk update && apk add -y git
RUN npm install -g @quasar/cli
RUN mkdir /home/node/app
WORKDIR /home/node/app
CMD /bin/sh
