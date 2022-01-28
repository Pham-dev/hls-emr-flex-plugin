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

# Todo React Build Step
