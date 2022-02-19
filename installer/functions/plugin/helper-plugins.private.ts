
import axios from 'axios';
import { ApplicationContext, Configuration } from '../../src/constants/interface';
import { 
  ACCOUNT_SID,
  AUTH_TOKEN,
  getParam
} 
from '../common';

export const listPluginsEndpoint = "https://flex-api.twilio.com/v1/PluginService/Plugins";

/**
 * Needed to make API calls
 * @param stringToConvert 
 * @returns - base64 string
 */
export const convertToBase64 = (stringToConvert: string) => {
  return Buffer.from(stringToConvert).toString('base64');
}

/**
 * 
 * @param accountSid 
 * @param authToken 
 * @returns - base64 User Credentials
 */
export const getBase64Credentials = (accountSid: string, authToken: string): string => {
  return convertToBase64(accountSid + ":" + authToken);
}

/**
 * Resource SID formats
 * 
 * Configurations = FJxxxxxxxxxxx;
 * Versions = FVxxxxxxxxxx;
 * Plugins = FPxxxxxxxxxxx;
 * Releases = FKxxxxxxxxx;
 */


export const getAllPlugins = async (context: ApplicationContext) => {
  const accountSid = await getParam(context, ACCOUNT_SID);
  const authToken = await getParam(context, AUTH_TOKEN);
  const base64Credentials = convertToBase64(accountSid + ":" + authToken);
  const plugins = await axios.get("https://flex-api.twilio.com/v1/PluginService/Plugins?PageSize=20", {
    headers: {
      Authorization: `Basic ${base64Credentials}`
    }
  })
  .then(res => res.data)
  .catch(error => console.error(error));
  console.log()
  return plugins;
}

/**
 * 
 * @param context 
 * @param pluginSid 
 * @param versionSid 
 * @param pluginUrl 
 * @returns version
 */
export const getPluginVersion = async (context: ApplicationContext, pluginSid: string, versionSid: string) => {
  const accountSid = getParam(context, ACCOUNT_SID);
  const authToken = getParam(context, AUTH_TOKEN);
  const base64Credentials = convertToBase64(accountSid + ":" + authToken);
  const version = await axios.get(`https://flex-api.twilio.com/v1/PluginService/Plugins/${pluginSid}/Versions/${versionSid}`, {
    headers: {
      Authorization: `Basic ${base64Credentials}`
    }
  })
  .then(res => res.data)
  .catch(error => console.error(error));
  return version;
}

/**
 * Given pluginSid return all versions of the plugin
 * returns version with SID with FVXXXXXXXXXXXXXXXXXXX
 * 
 * @param context 
 * @param pluginSid 
 * @returns versions
 */
export const getAllPluginVersions = async (context: ApplicationContext, pluginSid: string) => {
  const accountSid = await getParam(context, ACCOUNT_SID);
  const authToken = await getParam(context, AUTH_TOKEN);
  const base64Credentials = convertToBase64(accountSid + ":" + authToken);
  const versions = await axios.get(`https://flex-api.twilio.com/v1/PluginService/Plugins/${pluginSid}/Versions?PageSize=20`, {
    headers: {
      Authorization: `Basic ${base64Credentials}`
    }
  })
  .then(res => res.data)
  .catch(error => console.error(error));
  return versions;
}

/**
 * 
 * @param configurationName 
 * @param pluginVersionSid 
 * @returns configuration
 */
export const createPluginConfiguration = async (context: ApplicationContext, configurationName: string, pluginVersionSid: string): Promise<Configuration> => {
  const accountSid = await getParam(context, ACCOUNT_SID);
  const authToken = await getParam(context, AUTH_TOKEN);
  const base64Credentials = convertToBase64(accountSid + ":" + authToken);

  const response = await axios({
    url: "https://flex-api.twilio.com/v1/PluginService/Configurations",
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'post',
    data: `Plugins={\"plugin_version\": \"${pluginVersionSid}\"}&Name=${configurationName}`
  })
  .then(res => res.data)
  .catch(err => console.log(err));
  return response;
}

/**
 * Gets all plugin configurations
 * @param context 
 * @returns - array of configurations
 */
export const getAllPluginConfigurations = async (context: ApplicationContext): Promise<Configuration> => {
  const accountSid = await getParam(context, ACCOUNT_SID);
  const authToken = await getParam(context, AUTH_TOKEN);
  const base64Credentials = convertToBase64(accountSid + ":" + authToken);
  const configurations = await axios.get("https://flex-api.twilio.com/v1/PluginService/Configurations?PageSize=20", {
    headers: {
      Authorization: `Basic ${base64Credentials}`
    }
  })
  .then(res => res.data)
  .catch(error => console.log("Error: ", error));
  return configurations;
}

export const createPluginRelease = async (context: ApplicationContext, configurationSid: string) => {
  // axios post
  // returns a release with SID of FKXXXXXXXXXXXXXXXXX
  const accountSid = await getParam(context, ACCOUNT_SID);
  const authToken = await getParam(context, AUTH_TOKEN);
  const base64Credentials = convertToBase64(accountSid + ":" + authToken);
  const release = await axios({
    method: 'post',
    url: "https://flex-api.twilio.com/v1/PluginService/Releases",
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `ConfigurationId=${configurationSid}`
  })
  .then(res => res.data)
  .catch(error => error);
  return release;
}
