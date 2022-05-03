import { Context } from "@twilio-labs/serverless-runtime-types/types";

export interface ApplicationContext extends Context {
  ACCOUNT_SID: string;
  AUTH_TOKEN: string;
}

export interface Plugin extends ResourceInformation {
  friendly_name: string;
  date_updated: string;
  links: {
    plugin_versions: string;
  };
}

export interface Version extends ResourceInformation {
  private: boolean;
  changelog: string;
  version: string;
  plugin_url: string;
}

export interface Configuration extends ResourceInformation {
  links: {
    plugins: string;
  };
}

export interface DeployProjectParams {
  context: ApplicationContext;
  serviceSid?: string;
  functionSid?: string;
}

export interface Release extends ResourceInformation {
  configuration_sid: string;
}

interface ResourceInformation {
  archived: boolean;
  description: string;
  url: string;
  account_sid: string;
  sid: string;
  data_created: string;
  name: string;
}
