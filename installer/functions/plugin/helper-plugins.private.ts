
import axios from 'axios';
import { 
  ACCOUNT_SID, 
  ApplicationContext, 
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

/**
 * 
 * @param context 
 * @param pluginSid 
 * @param versionSid 
 * @param pluginUrl 
 * @returns version
 */
export const getPluginVersion = async (context: ApplicationContext, pluginSid: string, versionSid: string, pluginUrl: string) => {
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
  const accountSid = getParam(context, ACCOUNT_SID);
  const authToken = getParam(context, AUTH_TOKEN);
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
export const createPluginConfiguration = async (context: ApplicationContext, configurationName: string, ...pluginVersionSid: string[]) => {
  const accountSid = getParam(context, ACCOUNT_SID);
  const authToken = getParam(context, AUTH_TOKEN);
  const base64Credentials = convertToBase64(accountSid + ":" + authToken);
  const configuration = await axios.post(
    `https://flex-api.twilio.com/v1/PluginService/Configurations?Plugins={\"plugin_version\\\": \\\"${pluginVersionSid}\\\"}&Name=${configurationName}`, 
    {
      headers: {
        Authorization: `Basic ${base64Credentials}`
      }
    }
  )
  .then(res => res.data)
  .catch(error => console.error(error));
  return configuration;
}

/**
 * Gets all plugin configurations
 * @param context 
 * @returns - array of configurations
 */
export const getAllPluginConfigurations = (context: ApplicationContext) => {
  const accountSid = getParam(context, ACCOUNT_SID);
  const authToken = getParam(context, AUTH_TOKEN);
  const base64Credentials = convertToBase64(accountSid + ":" + authToken);
  const configurations = axios.get("https://flex-api.twilio.com/v1/PluginService/Configurations?PageSize=20", {
    headers: {
      Authorization: `Basic ${base64Credentials}`
    }
  })
  .then(res => res.data)
  .catch(error => console.error(error));
  return configurations;
}

export const createPluginRelease = async (context: ApplicationContext, configurationSid: string) => {
  // axios post
  // returns a release with SID of FKXXXXXXXXXXXXXXXXX
  const accountSid = getParam(context, ACCOUNT_SID);
  const authToken = getParam(context, AUTH_TOKEN);
  const base64Credentials = convertToBase64(accountSid + ":" + authToken);
  const release = await axios.post(`https://flex-api.twilio.com/v1/PluginService/Releases?ConfigurationId=${configurationSid}`, {
      headers: {
        Authorization: `Basic ${base64Credentials}`
      }
  })
  .then(res => res.data)
  .catch(error => console.error(error));
  return release;
}
