FROM mhart/alpine-node:10.15

# Set ENVs
ENV SHELL=/bin/bash

# Set the working directory
WORKDIR /home

# Get dependencies
RUN apk update && apk upgrade && apk --no-cache add build-base bash openssh openssl automake autoconf libtool libpng-dev

# Run the image as a non-root user
RUN adduser -D myuser

# Install dependencies
COPY package.json .
RUN yarn --ignore-scripts && yarn cache clean

# Add/Copy our files
COPY . .

# Set perms then set the user to non-root
USER root
RUN chown -R myuser /home
USER myuser
