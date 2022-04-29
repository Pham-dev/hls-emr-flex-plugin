# Installing the Plugin on your Flex Instance

## **1. Prerequisites**
### Create a Flex account
- First things first, you'll need to have a flex account
  - To do so you'll need to find the flex console and follow the instructions on the page to setup a flex account 
  - A flex account is just a sub account inside your main Twilio account

### Docker CLI and/or Docker Desktop
- Docker desktop will be used to run the application installer locally on your machine. Go to [Docker](https://www.docker.com/products/docker-desktop) website and download Docker with default options. After installation make sure to start Docker desktop.

### Ensure that Telehealth is deployed to your Flex Account
Once you get your flex account up and running, you'll need to deploy Telehealth to your newly created Flex account in order to access Telehealth capabilities through flex. Instructions to deploy Telehealth in this repo's [README.md](https://github.com/twilio/hls-telehealth).
1. After installing Telehealth inside your Flex account created in the intructions above, go to the Functions console.
2. Inside the Functions console, click on services and click into the service named ```telehealth``` (Assuming you deployed Telehealth to the account).
3. At the bottom-left of the page, just above the "Deploy All" Button, you'll want to save that URL as that is your ```REACT_APP_TELEHEALTH_URL`` which will be needed for the Docker build step in the next section.

## **2. Deploy the Plugin to your Flex Instance**

1. First, launch your Flex instance and click "Edit" under development setup.  Here you'll want to change the React Version to the latest; which is ```16.13.1```
2. Build the docker image of this installer by running this command in your terminal.  You'll need to get your Account Sid and Auth Token from your Twilio Console:
```
docker build --build-arg TWILIO_ACCOUNT_SID={ACCOUNT_SID} --build-arg TWILIO_AUTH_TOKEN={AUTH_TOKEN} --build-arg REACT_APP_TELEHEALTH_URL={REACT_APP_TELEHEALTH_URL} --no-cache --tag hls-flex-plugin https://github.com/Pham-dev/hls-emr-flex-plugin.git#main
```
3. Now run the built docker image by executing this command:
```
docker run --name hls-flex-plugin --rm -p 3000:3000 -p 3001:3001 -e ACCOUNT_SID={ACCOUNT_SID} -e AUTH_TOKEN={AUTH_TOKEN} -it hls-flex-plugin 
```
4. Go ahead and open [http://localhost:3000/](http://localhost:3000/) on your favorite browser.

5. Your credentials should load on the page and all you have to do is click the "Deploy this application" button and you're all set!

6. You can launch your Flex instance in your flex account to see the plugin now properly installed.


## **Subsequent Installs**
- Just repeat Step 2 above
- Notes: 
  - clear your cache on your browser if you run into problems
  - Re-installing will produce the latest version of the plugin