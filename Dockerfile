FROM mhart/alpine-node:10.15

# Set the working directory
WORKDIR /home

# Get dependencies

  RUN apk update && apk upgrade

  RUN apk --no-cache add build-base bash openssh openssl automake autoconf libtool libpng-dev

# Run the image as a non-root user
RUN adduser -D myuser

# Add/Copy our files
COPY . .

# Install dependencies
RUN touch /home/.env \
    && set -a \
    && . /home/.env \
    && yarn install

# Set perms then set the user to non-root
USER root
RUN chown -R myuser /home
USER myuser
