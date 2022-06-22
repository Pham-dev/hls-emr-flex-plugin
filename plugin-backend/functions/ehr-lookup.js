/* eslint-disable no-undef */
const JWEValidator = require("twilio-flex-token-validator").functionValidator;
const fetch = require("node-fetch");
const Headers = require("node-fetch").Headers;
const parsePhoneNumber = require("awesome-phonenumber").parsePhoneNumber;

exports.handler = JWEValidator(async function (context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
  response.appendHeader("Content-Type", "application/json");
  response.appendHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, User-Agent"
  );
  response.setStatusCode(200);

  try {
    const registerOpenEmrResult = await registerOpenEmr(context);

    if (registerOpenEmrResult.error) {
      console.error(registerOpenEmrResult.errorObject);
      response.setStatusCode(400);
      response.setBody("There was an error registering the OpenEMR client.");
      return callback(null, response);
    }

    const client_id = registerOpenEmrResult.result;

    const openEmrAuthResult = await ehrAuth(context, client_id);

    if (openEmrAuthResult.error) {
      console.error(openEmrAuthResult.errorObject);
      response.setStatusCode(400);
      response.setBody("There was an error authenticating the OpenEMR client.");
      return callback(null, response);
    }

    const access_token_info = openEmrAuthResult.result;

    const getPatientResult = await getPatient(
      context,
      access_token_info,
      client_id,
      event
    );

    if (getPatientResult.error) {
      console.error(getPatientResult.errorObject);
      response.setStatusCode(400);
      response.setBody("There was an error getting the patient.");
      return callback(null, response);
    }

    response.setBody(getPatientResult);

    return callback(null, response);
  } catch (err) {
    response.setStatusCode(500);
    response.setBody(err);
    return callback(null, response);
  }
});

const registerOpenEmr = (context) => {
  const body = {
    application_type: "private",
    client_name: "hls-api-client",
    token_endpoint_auth_method: "client_secret_post",
    redirect_uris: ["http://localhost:3000"],
    post_logout_redirect_uris: ["http://localhost:3000"],
    initiate_login_uri: "http://localhost:3000",
    username: "admin",
    password: "pass",
    scope:
      "openid offline_access api:oemr api:fhir api:port user/allergy.read user/allergy.write user/appointment.read user/appointment.write user/dental_issue.read user/dental_issue.write user/document.read user/document.write user/drug.read user/encounter.read user/encounter.write user/facility.read user/facility.write user/immunization.read user/insurance.read user/insurance.write user/insurance_company.read user/insurance_company.write user/insurance_type.read user/list.read user/medical_problem.read user/medical_problem.write user/medication.read user/medication.write user/message.write user/patient.read user/patient.write user/practitioner.read user/practitioner.write user/prescription.read user/procedure.read user/soap_note.read user/soap_note.write user/surgery.read user/surgery.write user/vital.read user/vital.write user/AllergyIntolerance.read user/CareTeam.read user/Condition.read user/Coverage.read user/Encounter.read user/Immunization.read user/Location.read user/Medication.read user/MedicationRequest.read user/Observation.read user/Organization.read user/Organization.write user/Patient.read user/Patient.write user/Practitioner.read user/Practitioner.write user/PractitionerRole.read user/Procedure.read patient/encounter.read patient/patient.read patient/AllergyIntolerance.read patient/CareTeam.read patient/Condition.read patient/Encounter.read patient/Immunization.read patient/MedicationRequest.read patient/Observation.read patient/Patient.read patient/Procedure.read",
  };
  return fetch(
    `http://${context.REACT_APP_NGROK_URL}/oauth2/default/registration`,
    {
      body: JSON.stringify(body),
      headers: new Headers({ "content-type": "application/json" }),
      method: "POST",
    }
  )
    .then((resp) => resp.json())
    .then(({ client_id }) => {
      return { error: false, result: client_id };
    })
    .catch((err) => {
      return { error: true, errorObject: err };
    });
};

const ehrAuth = (context, client_id) => {
  if (client_id === undefined) {
    response.setStatusCode(400);
    response.setBody("client_id was not provided.");
    return callback(null, response);
  }

  const body = {
    client_id,
    grant_type: "password",
    user_role: "users",
    username: "admin",
    password: "pass",
    scope:
      "openid offline_access api:oemr api:fhir api:port user/allergy.read user/allergy.write user/appointment.read user/appointment.write user/dental_issue.read user/dental_issue.write user/document.read user/document.write user/drug.read user/encounter.read user/encounter.write user/facility.read user/facility.write user/immunization.read user/insurance.read user/insurance.write user/insurance_company.read user/insurance_company.write user/insurance_type.read user/list.read user/medical_problem.read user/medical_problem.write user/medication.read user/medication.write user/message.write user/patient.read user/patient.write user/practitioner.read user/practitioner.write user/prescription.read user/procedure.read user/soap_note.read user/soap_note.write user/surgery.read user/surgery.write user/vital.read user/vital.write user/AllergyIntolerance.read user/CareTeam.read user/Condition.read user/Encounter.read user/Immunization.read user/Location.read user/Medication.read user/MedicationRequest.read user/Observation.read user/Organization.read user/Organization.write user/Patient.read user/Patient.write user/Practitioner.read user/Practitioner.write user/PractitionerRole.read user/Procedure.read patient/encounter.read patient/patient.read patient/Encounter.read patient/Patient.read",
  };

  return fetch(`http://${context.REACT_APP_NGROK_URL}/oauth2/default/token`, {
    body: new URLSearchParams(body),
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    method: "POST",
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        const statusCode =
          resp.error_description && resp.error_description === "Bad Request"
            ? 400
            : 500;
        return { error: true, errorObject: resp.error };
      } else {
        const { access_token, expires_in, refresh_token } = resp;
        console.log(`Access token expires in ${expires_in}`);
        return {
          error: false,
          result: {
            access_token,
            expires_in,
            refresh_token,
          },
        };
      }
    });
};

const getPatient = (context, access_token_info, client_id, event) => {
  const { access_token } = access_token_info;

  if (!event.cmd) {
    return {
      error: true,
      errorObject: "No cmd included.",
    };
  }

  if (event.cmd === "name") {
    const first_name = event.first_name;
    const last_name = event.last_name;

    //validation
    if (!last_name || !first_name || !access_token) {
      return {
        error: true,
        errorObject: "first_name, last_name, or access_token missing.",
      };
    }

    return fetch(
      `http://${context.REACT_APP_NGROK_URL}/apis/default/fhir/Patient`,
      {
        headers: new Headers({ Authorization: `Bearer ${access_token}` }),
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        let patient = null;
        if (data.total === 0) {
          patient = defaultPatient;
        } else if (data.total === 1) {
          patient = data.entry[0].resource;
        } else {
          // multiple match on given OR famiy, so filter
          const matches = data.entry.filter((e) => {
            return (
              e.resource.name[0].family === last_name &&
              e.resource.name[0].given.includes(first_name)
            );
          });
          patient = matches.length === 0 ? defaultPatient : matches[0].resource;
        }
        return {
          error: false,
          result: {
            accessTokenInfo: access_token_info,
            clientId: client_id,
            patientInfo: patient,
          },
        };
      });
  } else if (event.cmd === "phone") {
    if (!event.phone || !access_token) {
      return {
        error: true,
        errorObject: "phone or access token was not included.",
      };
    }

    const searchPhone = parsePhoneNumber(event.phone, "US");
    if (!searchPhone.isValid()) {
      return { error: true, errorObject: "phone number provided is not valid" };
    }

    return fetch(
      `http://${context.REACT_APP_NGROK_URL}/apis/default/fhir/Patient`,
      {
        headers: new Headers({ Authorization: `Bearer ${access_token}` }),
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        let patient = null;
        if (data.total === 0) {
          patient = defaultPatient;
        } else if (data.total === 1) {
          patient = data.entry[0].resource;
        } else {
          // multiple match on given OR famiy, so filter
          const matches = data.entry.filter(
            (e) =>
              e.resource.telecom.filter((t) => {
                if (!!t.value) {
                  const emrPhone = parsePhoneNumber(t.value, "US");
                  return emrPhone.getNumber() === searchPhone.getNumber();
                }
                return false;
              }).length > 0
          );
          patient = matches.length === 0 ? defaultPatient : matches[0].resource;
        }
        return {
          error: false,
          result: {
            accessTokenInfo: access_token_info,
            clientId: client_id,
            patientInfo: patient,
          },
        };
      });
  }
};

const defaultPatient = {
  id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  resourceType: "Patient",
  name: [
    {
      use: "official",
      family: "Doe",
      given: ["Mary Ann"],
    },
  ],
  telecom: [
    { system: "phone", value: "", use: "home" },
    { system: "phone", value: "", use: "work" },
    { system: "phone", value: "111-222-3333", use: "mobile" },
    { system: "email", value: "", use: "home" },
  ],
  gender: "female",
  birthDate: "1990-01-01",
};
