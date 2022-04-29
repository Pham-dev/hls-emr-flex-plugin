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
ARG REACT_APP_TELEHEALTH_URL=url

# Download serverless and flex plugin CLIs
RUN twilio plugins:install @twilio-labs/plugin-serverless
RUN twilio plugins:install @twilio-labs/plugin-flex

# Copy directory over to /hls-deploy folder
WORKDIR /hls-deploy
COPY . /hls-deploy
WORKDIR /hls-deploy/plugin-backend
RUN npm install
RUN echo "REACT_APP_BACKEND_URL=$(eval twilio serverless:deploy -o=json | grep -o '"domain": "[^"]*' | grep -o '[^"]*$')" > .env
RUN echo "REACT_APP_TELEHEALTH_URL=${REACT_APP_TELEHEALTH_URL}" >> .env
RUN cp .env /hls-deploy
WORKDIR /hls-deploy
RUN npm install

# Run deploy command to get a working version
RUN twilio flex:plugins:deploy --major --changelog 'Deploy Major HLS Flex Plugin' --description 'Deployment' -l debug

# Installer folder is now working directory
WORKDIR /hls-deploy/installer
RUN npm install
RUN npm run build-ts
RUN npx tailwindcss -i ./src/index.css -o ./assets/style.css

EXPOSE 3000 3001

CMD ["npm", "run", "start"]