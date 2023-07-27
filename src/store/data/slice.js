import { createAction, createSlice } from "@reduxjs/toolkit";
import { SAGA_FLOW_NAME } from "./sagas";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDataRequest: (state, action) => {
      //   state.data = action.payload;
      state.isLoading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      //   state.data = action.payload;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const getData = ({ data }) => data.data;
const getIsLoading = ({ data }) => data.isLoading;
const getError = ({ data }) => data.error;

export const selectors = {
  getData,
  getIsLoading,
  getError,
};

export const { actions, reducer } = slice;

export const sagaActions = {
  sagaGetData: createAction(SAGA_FLOW_NAME.GET_DATA),
};
