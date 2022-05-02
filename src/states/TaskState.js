import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { fetchingState } from "../states";

export const ACTION_FETCHING_FIHR = "FETCHING_FIHR_DATA";
export const ACTION_FETCHING_FIHR_SUCCESS = "FETCHING_FIHR_DATA_SUCCSS";
export const ACTION_FETCHING_FIHR_FAILURE = "FETCHING_FIHR_DATA_FAILURE";

export class TaskActions {
  static fetchingFihrData = () => ({ type: ACTION_FETCHING_FIHR });
  static fetchingFihrDataSuccess = (payload) => ({
    payload,
    type: ACTION_FETCHING_FIHR_SUCCESS,
  });
  static fetchingFihrDataFailure = () => ({
    type: ACTION_FETCHING_FIHR_FAILURE,
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
    case ACTION_FETCHING_FIHR: {
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
    case ACTION_FETCHING_FIHR_SUCCESS: {
      const s = {
        ...state,
        ...payload,
        fetching: false,
        fetchingFailed: false,
        fetchingSuccess: true,
      };
      return s;
    }
    case ACTION_FETCHING_FIHR_FAILURE: {
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
