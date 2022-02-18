import { Context, TwilioClient } from "@twilio-labs/serverless-runtime-types/types";

// constants
export const IS_LOCALHOST = "IS_LOCALHOST";
export const ACCOUNT_SID = "ACCOUNT_SID";
export const AUTH_TOKEN = "AUTH_TOKEN";
export const LOCAL_HOST = "localhost:";

export interface ApplicationContext extends Context {
  ACCOUNT_SID: string;
  AUTH_TOKEN: string;
}

export function getParam(context: Context, key: string) {
  const client = context.getTwilioClient();
  const appContext = context as ApplicationContext;
  try {
    switch (key) {
      case IS_LOCALHOST: {
        return isLocalhost(appContext);
      }
      case ACCOUNT_SID: {
        return getAccountSid(appContext, client);
      }
      case AUTH_TOKEN: {
        return getAuthToken(appContext, client);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function isLocalhost(context: ApplicationContext): string {
  return context.DOMAIN_NAME.startsWith('localhost:') ? 'yes' : 'no';
}

async function getAccountSid(context: ApplicationContext, client: TwilioClient): Promise<string> {
  try {
    if (context.ACCOUNT_SID) return context.ACCOUNT_SID;
    const account = await client.api.accounts
      .list({status: 'active', limit: 20})
      .then(accounts => accounts[0]);
    return account.sid;
  } catch (err) {
    console.error(err);
    throw(err);
  }
}

async function getAuthToken(context: ApplicationContext, client: TwilioClient): Promise<string> {
  try {
    if (context.AUTH_TOKEN) return context.AUTH_TOKEN;
    const account = await client.api.accounts
      .list({status: 'active', limit: 20})
      .then(accounts => accounts[0]);
    return account.authToken;
  } catch (err) {
    console.error(err);
    throw(err);
  }
}
