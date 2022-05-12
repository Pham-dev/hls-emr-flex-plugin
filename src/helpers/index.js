export { setUpComponents } from "./components";
export { setUpActions } from "./actions";
export { setUpNotifications } from "./notifications";
export { getAccessTokenInfo, getClientId, getPatientInfo } from "./fhir";
export function fetchWithTimeout(url, options, timeout = 7000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
}
