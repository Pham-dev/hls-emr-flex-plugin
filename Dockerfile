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
ARG REACT_APP_TELEHEALTH_URL=telehealthUrl
ARG REACT_APP_NGROK_URL=url

# Update React Version to 16.13.1.  By default this plugin is not compatible with the default version (16.5.2)
RUN curl -X POST 'https://flex-api.twilio.com/v1/Configuration' \
    -u ${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN} \
    -H 'Content-Type: application/json' \
    -d "{\"account_sid\":\"${TWILIO_ACCOUNT_SID}\",\"ui_dependencies\":{\"react\":\"~16.13.1\",\"react-dom\":\"~16.13.1\"}}"

# Download serverless and flex plugin CLIs
RUN twilio plugins:install @twilio-labs/plugin-serverless
RUN twilio plugins:install @twilio-labs/plugin-flex

# Copy directory over to /hls-deploy folder
WORKDIR /hls-deploy
COPY . /hls-deploy
WORKDIR /hls-deploy/plugin-backend
RUN npm install
RUN echo "REACT_APP_NGROK_URL=${REACT_APP_NGROK_URL}" > .env
RUN echo "gfAccountKey=6735d87e-1cd1-4b7b-ab00-719ff6f05507" >> .env
RUN echo "gfAccountSecret=1Eu7MkApmwjvKdSERDLJpnLCVb8BMgaMOaaY1krcH30=" >> .env
RUN echo "gfApiUrl=https://api.geofluent.com/Translation/v3/" >> .env
RUN echo "REACT_APP_BACKEND_URL=$(eval twilio serverless:deploy --override-existing-project --runtime node14 -o=json | grep -o '"domain": "[^"]*' | grep -o '[^"]*$')" >> .env
RUN cp .env /hls-deploy
WORKDIR /hls-deploy
RUN echo "REACT_APP_TELEHEALTH_URL=${REACT_APP_TELEHEALTH_URL}" >> .env
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
