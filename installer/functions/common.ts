import { Context, TwilioClient } from "@twilio-labs/serverless-runtime-types/types";
import { ApplicationContext } from "./interface";
import { ACCOUNT_NAME, ACCOUNT_SID, AUTH_TOKEN, IS_LOCALHOST } from "./constants";

export async function getParam(context: Context, key: string) {
  
  const client = context.getTwilioClient();
  const appContext = context as ApplicationContext;
  const activeAccount = await getActiveAccount(client);

  try {
    switch (key) {
      case IS_LOCALHOST: {
        return isLocalhost(appContext);
      }
      case ACCOUNT_SID: {
        return appContext.ACCOUNT_SID ? appContext.ACCOUNT_SID : activeAccount?.sid;
      }
      case AUTH_TOKEN: {
        return appContext.AUTH_TOKEN ? appContext.AUTH_TOKEN : activeAccount?.authToken;
      }
      case ACCOUNT_NAME: {
        return activeAccount?.friendlyName;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function isLocalhost(context: ApplicationContext): string {
  return context.DOMAIN_NAME.startsWith('localhost:') ? 'yes' : 'no';
}

export async function getActiveAccount(client: TwilioClient) {
  try {
    return await client.api.accounts
      .list()
      .then(accounts => accounts[0]);
  } catch(err) {
    console.error(err);
  }
}

/**
 * Needed to make API calls
 * @param stringToConvert 
 * @returns - base64 string
 */
 export const convertToBase64 = (stringToConvert: string) => {
  return Buffer.from(stringToConvert).toString('base64');
}
