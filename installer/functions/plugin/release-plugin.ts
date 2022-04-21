import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';
import { hlsPluginName } from '../constants';
import { ApplicationContext, Configuration, Plugin, Version } from '../interface';
import { createPluginConfiguration, createPluginRelease, getAllPlugins, getAllPluginVersions } from './helper-plugins.private';

export const handler: ServerlessFunctionSignature = async function(
  context: Context,
  event: {},
  callback: ServerlessCallback
) {
  const client = context.getTwilioClient();
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  try {
    // Get all plugins on the account but only deploy flex.
    const pluginsResp = await getAllPlugins(context as ApplicationContext);
    const plugins: Plugin[] = pluginsResp.plugins;
    const flexPlugin = plugins.find(plugin => plugin.friendly_name === hlsPluginName);
    //console.log(flexPlugin);

    if (!flexPlugin) {
      response.setStatusCode(400);
      response.setBody({ error: "Could not find HLS Flex Plugin on account!" });
      return callback(null, response);
    }

    // get the plugin SID
    const pluginVersionsResp = await getAllPluginVersions(context as ApplicationContext, flexPlugin!.sid);
    const pluginVersions: Version[] = pluginVersionsResp.plugin_versions;
    //console.log(pluginVersions);

    if (!pluginVersions) {
      response.setStatusCode(400);
      response.setBody({ error: "Could not find HLS Flex Plugin Versions!" });
      return callback(null, response);
    }

    // Latest Version will always be first in the array
    // Grab the sid of latest version
    const latestVersionSid = pluginVersions[0].sid;
    const config: Configuration = await createPluginConfiguration(context as ApplicationContext, "HLS-Flex-Config",  latestVersionSid);
  
    // release the configuration
    const pluginRelease = await createPluginRelease(context as ApplicationContext, config.sid);
    console.log(pluginRelease)

    response.setStatusCode(200);
    response.setBody(
      { 
        data: {
          configuration: config,
          release: pluginRelease
        }
      });
    return callback(null, response);

  } catch (err: any) {
    response.setBody({error: err});
    response.setStatusCode(400);
    return callback(err, response)
  }
}