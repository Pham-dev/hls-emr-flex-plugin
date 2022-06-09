import { fetchWithTimeout, getBasePath } from ".";

export const getClientId = (body) =>
  fetchWithTimeout(
    `${getBasePath()}/register-ehr-client`,
    { method: "POST", body: new URLSearchParams(body) },
    10000
  )
    .then((resp) => resp.json())
    .then((resp) => resp.client_id);

export const getAccessTokenInfo = (client_id, Token) =>
  fetchWithTimeout(
    `${getBasePath()}/ehr-auth`,
    {
      method: "POST",
      body: new URLSearchParams({ client_id, Token }),
    },
    10000
  ).then((resp) => resp.json());

export const getPatientInfoByName = (
  access_token,
  first_name,
  last_name,
  Token
) =>
  fetchWithTimeout(
    `${getBasePath()}/patient`,
    {
      method: "POST",
      body: new URLSearchParams({
        cmd: "name",
        access_token,
        first_name,
        last_name,
        Token,
      }),
    },
    10000
  ).then((resp) => resp.json());

export const getPatientByPhone = (access_token, phone, Token) => {
  return fetchWithTimeout(
    `${getBasePath()}/patient`,
    {
      method: "POST",
      body: new URLSearchParams({
        cmd: "phone",
        access_token,
        phone,
        Token,
      }),
    },
    10000
  )
    .then((resp) => resp.json())
    .then((res) => {
      return res;
    });
};
