# --------------------------------------------------------------------------------
# Dockerfile for Installing Flex Flex plugins and Task Routers
#
# To run,
#
# - install Docker desktop on your machine
# - TBD
#
# --------------------------------------------------------------------------------

FROM twilio/twilio-cli:latest
ARG TWILIO_ACCOUNT_SID=sid
ARG TWILIO_AUTH_TOKEN=token
ENV TWILIO_ACCOUNT_SID ${TWILIO_ACCOUNT_SID}
ENV TWILIO_AUTH_TOKEN ${TWILIO_AUTH_TOKEN}

# Download serverless and flex plugin CLIs
RUN twilio plugins:install @twilio-labs/plugin-serverless
RUN twilio plugins:install @twilio-labs/plugin-flex

# Copy directory over to /hls-deploy folder
WORKDIR /hls-deploy
COPY . /hls-deploy
RUN npm install

# Run deploy command to get a working version
RUN twilio flex:plugins:deploy --major --changelog 'Deploy Major HLS Flex Plugin' --description 'Deployment' -l debug

# Installer folder is now working directory
WORKDIR /hls-deploy/installer
RUN npm install
RUN npm run build-ts

EXPOSE 3000 3001

CMD ["npm", "run", "dev"]