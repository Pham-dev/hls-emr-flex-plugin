import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { fetchingState } from "../states";

export const ACTION_FETCHING_FHIR = "FETCHING_FHIR_DATA";
export const ACTION_FETCHING_FHIR_SUCCESS = "FETCHING_FHIR_DATA_SUCCSS";
export const ACTION_FETCHING_FHIR_FAILURE = "FETCHING_FHIR_DATA_FAILURE";

export class TaskActions {
  static fetchingFhirData = () => ({ type: ACTION_FETCHING_FHIR });
  static fetchingFhirDataSuccess = (payload) => ({
    payload,
    type: ACTION_FETCHING_FHIR_SUCCESS,
  });
  static fetchingFhirDataFailure = () => ({
    type: ACTION_FETCHING_FHIR_FAILURE,
  });
}

export const initialState = {
  ...fetchingState,
  accessTokenInfo: null,
  clientId: null,
  patientInfo: null,
};

export function reduce(state = initialState, { type, payload }) {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (type) {
    case ACTION_FETCHING_FHIR: {
      console.log("FETCHING");
      return {
        ...state,
        accessTokenInfo: null,
        clientId: null,
        patientInfo: null,
        fetching: true,
        fetchingFailed: false,
        fetchingSuccess: false,
      };
    }
    case ACTION_FETCHING_FHIR_SUCCESS: {
      const s = {
        ...state,
        ...payload,
        fetching: false,
        fetchingFailed: false,
        fetchingSuccess: true,
      };
      return s;
    }
    case ACTION_FETCHING_FHIR_FAILURE: {
      console.log("FAILURE");
      return {
        ...state,
        accessTokenInfo: null,
        clientId: null,
        patientInfo: null,
        fetching: false,
        fetchingFailed: true,
        fetchingSuccess: false,
      };
    }
    default:
      return state;
  }
}
