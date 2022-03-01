# HLS Flex Plugin Providers

This Package will allow you to seemlessly setup the HLS Flex Plugin to your own Twilio Flex account. 

*Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).*
## **Pre-requisites:**
**Docker CLI and/or Docker Desktop**
- Docker desktop will be used to run the application installer locally on your machine. Go to [Docker](https://www.docker.com/products/docker-desktop) website and download Docker with default options. After installation make sure to start Docker desktop.

**Twilio Account**
- Create a [Twilio account](https://www.twilio.com/try-twilio) if you have not done so already
- After creating your account you will have access to an **Account Sid** and an **Auth Token** which will be needed to run through the installation.

**Create a Flex account**

1. Ensure you sign up or login to your Twilio account in the step above.
2. While in your Twilio console, go to the Overview of the Flex section under the Develop tab on the left-hand panel.
3. Click on the "Create my Flex account" button on the page.
4. Follow the steps to verify your email and phone and then after a couple minutes you should have a working-bare-bones Flex instance on your account.

**Ensure that Telehealth is deployed to your Flex Account**
Once you get your flex account up and running, you'll need to deploy Telehealth to your newly created Flex account in order to access Telehealth capabilities through flex. Instructions to deploy Telehealth in this repo's [README.md](https://github.com/Pham-dev/telehealth-v2).
1. After installing Telehealth inside your Flex account created in the intructions above, go to the Functions console.
2. Inside the Functions console, click on services and click into the service named ```flex-telehealth``` (Assuming you deployed Telehealth to the account).
3. At the bottom-left of the page, just above the "Deploy All" Button, you'll want to save that URL as that is your ```REACT_APP_BACKEND_URL``` which will be needed for the Docker build step in the next section.
## **Deploying this plugin to your Twilio Flex instance**

### Deploy the Plugin to your Flex Instance

1. First, launch your Flex instance and click "Edit" under development setup.  Here you'll want to change the React Version to the latest; which is ```16.13.1```
2. Build the docker image of this installer by running this command in your terminal.  You'll need to get your Account Sid and Auth Token from your Twilio Console:
```
docker build --build-arg TWILIO_ACCOUNT_SID={ACCOUNT_SID} --build-arg TWILIO_AUTH_TOKEN={AUTH_TOKEN} --build-arg REACT_APP_BACKEND_URL={REACT_APP_BACKEND_URL} --no-cache --tag hls-flex-plugin https://github.com/Pham-dev/hls-emr-flex-plugin.git#main
```
3. Now run the built docker image by executing this command:
```
docker run --name hls-flex-plugin --rm -p 3000:3000 -p 3001:3001 -e ACCOUNT_SID={ACCOUNT_SID} -e AUTH_TOKEN={AUTH_TOKEN} -it hls-flex-plugin 
```
4. Go ahead and open [http://localhost:3000/](http://localhost:3000/) on your favorite browser.

5. Your credentials should load on the page and all you have to do is click the "Deploy this application" button and you're all set!

 # Development

### Installer Development:
1.  ```cd``` into the ```/installer``` folder: ```cd installer```
2. run ```npm install``` if it's your first time developing
3. Then run ```npm run dev``` to spin up
    - A front-end server on port ```3000```
    - A back-end server on port ```3001```
    - TypeScript compiler on ```--watch``` mode
    - TailwindCSS compiler

### Plugin Development:
1. You'll need to download the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart)
2. In the root directory of the project, run the command:
```
twilio flex:plugins:start
```
