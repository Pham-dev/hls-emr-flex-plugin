export const getClientId = (body) =>
  fetchWithTimeout(
    `https://${process.env.REACT_APP_BACKEND_URL}/register-ehr-client`,
    { method: "POST", body: new URLSearchParams(body) },
    10000
  )
    .then((resp) => resp.json())
    .then((resp) => resp.client_id);

export const getAccessTokenInfo = (client_id, Token) =>
  fetchWithTimeout(
    `https://${process.env.REACT_APP_BACKEND_URL}/ehr-auth`,
    {
      method: "POST",
      body: new URLSearchParams({ client_id, Token }),
    },
    10000
  ).then((resp) => resp.json());

export const getPatientInfo = (access_token, first_name, last_name, Token) =>
  fetchWithTimeout(
    `https://${process.env.REACT_APP_BACKEND_URL}/patient`,
    {
      method: "POST",
      body: new URLSearchParams({
        access_token,
        first_name,
        last_name,
        Token,
      }),
    },
    10000
  ).then((resp) => resp.json());
