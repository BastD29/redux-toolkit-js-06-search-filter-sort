import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { SAGA_FLOW_NAME } from "./sagas";
import { searchSelectors } from "../search";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDataRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const selectData = (state) => state.data.data.data;
const selectFilteredData = (state) => {
  const allData = selectData(state) || [];
  // console.log("allData", allData);
  const searchTerm = searchSelectors.selectSearchTerm(state);
  // console.log("searchTerm", searchTerm);

  // prettier-ignore
  return allData.filter((datum) => datum.name.toLowerCase().includes(searchTerm.toLowerCase()))
};

const selectIsLoading = ({ data }) => data.data.isLoading;
const selectError = ({ data }) => data.data.error;

export const selectors = {
  selectData,
  selectFilteredData,
  selectIsLoading,
  selectError,
};

export const { actions, reducer } = slice;

export const sagaActions = {
  sagaGetData: createAction(SAGA_FLOW_NAME.GET_DATA),
};
