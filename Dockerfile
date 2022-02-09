# --------------------------------------------------------------------------------
# Dockerfile for Installing Flex and HLS-EMR
#
# To run,
#
# - install Docker desktop on your machine
# - TBD
# - run 'docker run -p 3000:3000 -it hls-installer'
# - open in browser, http://localhost:3000/installer.html
#
# --------------------------------------------------------------------------------

FROM twilio/twilio-cli:latest
ARG TWILIO_ACCOUNT_SID=sid
ARG TWILIO_AUTH_TOKEN=token

# Download serverless and flex plugin CLIs
RUN twilio plugins:install @twilio-labs/plugin-serverless
RUN twilio plugins:install @twilio-labs/plugin-flex

WORKDIR /hls-deploy
COPY Dockerfile package.json .env /hls-deploy
COPY ./* /hls-deploy/

RUN npm install

EXPOSE 3000

# Deploy to plugin
#twilio flex:plugins:deploy --changelog "Deploy to Flex"
CMD ["twilio", "flex:plugins:deploy", "--changelog", "deploy to flex"]