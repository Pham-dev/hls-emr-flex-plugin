# HLS Flex Plugin Providers

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## Deploying this plugin to your Twilio Flex instance

### Create a Flex account

1. Ensure you sign up or login to your Twilio account.
2. While in your Twilio console, go to the Overview of the Flex section under the Develop tab on the left-hand panel.
3. Click on the "Create my Flex account" button on the page.
4. Follow the steps to verify your email and phone and then after a couple minutes you should have a working-bare-bones Flex instance on your account.

### Deploy the Plugin to your Flex Instance
1. 



## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex@beta
```

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

