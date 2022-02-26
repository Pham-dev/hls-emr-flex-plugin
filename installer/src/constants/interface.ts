export interface Plugin extends ResourceInformation {
  friendly_name: string;
  date_updated: string;
  links: {
    plugin_versions: string;
  }
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
