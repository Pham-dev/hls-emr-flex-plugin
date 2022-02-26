import { TwilioClient } from "@twilio-labs/serverless-runtime-types/types";
import { ACCOUNT_SID, AUTH_TOKEN, HLS_FLEX_SERVICE, PROVIDER_LINK_FUNCTION_NAME } from "../constants";
import { getListOfFunctionsAndAssets } from "@twilio-labs/serverless-api/dist/utils/fs";
import fs from 'fs';
import { DeployProjectConfig, DeployResult, TwilioServerlessApiClient } from "@twilio-labs/serverless-api";
import { getParam } from "../common";
import { DeployProjectParams } from "../interface";

export const createHLSFlexFunctionsService = (client: TwilioClient) => {
  return client.serverless.services
    .create({
      includeCredentials: true,
      uniqueName: HLS_FLEX_SERVICE,
      friendlyName: HLS_FLEX_SERVICE,
    });
}

export const getHLSFlexService = async (client: TwilioClient) => {
  const services = await client.serverless.services.list();
  return services.find(service => 
    service.friendlyName === HLS_FLEX_SERVICE ||
    service.uniqueName === HLS_FLEX_SERVICE
  );
}

export const deleteService = async (client: TwilioClient, serviceSid: string) => {
  return client.serverless.services(serviceSid).remove();
}

export const createGetProviderLinkFunction = async (client: TwilioClient, serviceSid: string) => {
  return client.serverless.services(serviceSid)
    .functions
    .create({friendlyName: PROVIDER_LINK_FUNCTION_NAME});
}

export const getFlexLinkFunction = async (client: TwilioClient, serviceSid: string) => {
  const functions_ = await client.serverless.services(serviceSid)
    .functions
    .list();
  return functions_.find(f => f.friendlyName === PROVIDER_LINK_FUNCTION_NAME);
}

export const getFlexLinkFunctionVersion = async (client: TwilioClient, serviceSid: string, functionSid: string) => {
  const functionVersions = await client.serverless.services(serviceSid)
    .functions(functionSid)
    .functionVersions
    .list();
  return functionVersions;
}

export const getProviderLinkFunction = async () => {
  const { functions } = await getListOfFunctionsAndAssets(process.cwd(),{
    functionsFolderNames: ["./build/functions/telehealth"],
    assetsFolderNames: []
  });
  console.log('functions count:', functions.length);
  return functions;
}

export const getFunctionDependencies = () => {
  const packageJsonRaw = fs.readFileSync(process.cwd() + '/package.json');
  const packageDotJson = JSON.parse(packageJsonRaw.toString());
  console.log(packageDotJson.dependencies);
  return packageDotJson.dependencies;
}

export const deployLocalFunctions = async (options: DeployProjectParams, deployOptions: DeployProjectConfig): Promise<DeployResult> => {
  const accountSid = await getParam(options.context, ACCOUNT_SID);
  const authToken = await getParam(options.context, AUTH_TOKEN);
  const serverlessClient = new TwilioServerlessApiClient({
    username: accountSid!,
    password: authToken!
  });
  return serverlessClient.deployProject(deployOptions);
}

export async function getAssets() {
  const { assets } = await getListOfFunctionsAndAssets(process.cwd(), {
    functionsFolderNames: [],
    assetsFolderNames: ["assets"],
  });
  //console.log('asset count:', assets.length);

  const indexHTMLs = assets.filter(asset => asset.name.includes('index.html'));
  // Set indext.html as a default document
  const allAssets = assets.concat(indexHTMLs.map(ih => ({
    ...ih,
    path: ih.name.replace("index.html", ""),
    name: ih.name.replace("index.html", ""),
  })));
  //console.log(allAssets);
  return allAssets;
}