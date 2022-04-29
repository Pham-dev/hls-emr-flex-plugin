import { string } from "prop-types";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { resolve } from "path";

const ACTION_SELECT_TASK = "SELET_TASK";

const initialState = {
  name: "Mary Ann Doe",
  dob: "1990-01-01",
  isFetching: false,
  fetchingFailed: false,
  fetchingSuccess: false
};

export class Actions {
  static selectTask = () => ({ type: ACTION_SELECT_TASK });
}

/**
 * params contains name
 */
const getFihrData = createAsyncThunk(
  "Fetch Fihr Data",
  async (params, { dispatch, getState }) => {
    try {
      //1. Register the client, and get the client ID
      //2. Is get an access token
      //3. Get fihr data
      //4. Return the fihr data, or an error

      const { name } = params;

      const result = fetch("registerClientEndpoint")
      .then(resp=>resp.json())
      .then(async resp=>{
          const {clientId} = resp;
          const res = await fetch(`getAccessTokenEndpoint?clientId=${clientId}}`)
          return res
      })
      .then(resp=>resp.json())
      .then(resp=>{
          const {accessToken} = resp
          const res = await fetch("getFihrDataEndpoint", {method: 'POST', body: JSON.stringify({accessToken})})
          return res
      })
      .then(resp=>resp.json())

      //pseudocode
      const patient = result.entry.find(e=>e.name === name)

      return patient;
    } catch (err) {
      return err;
    }
  }
);

export function reduce(state = initialState, action) {
    createReducer(initialState, builder => {
        builder
        .addCase(getFihrData.pending, state => {
            return {
                ...state,
                isFetching: true,
                fetchingFailed: false,
                fetchingSuccess: false
            }

        })
        .addCase(getFihrData.fulfilled, (state, payload) => {
            return {
                ...state,
                isFetching: false,
                fetchingFailed: false,
                fetchingSuccess: true,
                dob: payload.dob,
                name: payload.name
            }
        })
        .addCase(getFihrData.rejected, (state, payload)=> {
            return {
                ...state,
                isFetching: false,
                fetchingFailed: true,
                fetchingSuccess: false
            }
        })
    })
}
