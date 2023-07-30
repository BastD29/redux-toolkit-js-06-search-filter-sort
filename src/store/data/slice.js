import { createAction, createSlice } from "@reduxjs/toolkit";
import { SAGA_FLOW_NAME } from "./sagas";
import { searchSelectors } from "../search";
import { filterSelectors } from "../filter";

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
const selectIsLoading = ({ data }) => data.data.isLoading;
const selectError = ({ data }) => data.data.error;

const selectSearchedData = (state) => {
  const allData = selectData(state) || [];
  const searchTerm = searchSelectors.selectSearchTerm(state);

  // prettier-ignore
  return allData.filter((datum) => datum.name.toLowerCase().includes(searchTerm.toLowerCase()))
};

const selectFilteredData = (state) => {
  const allData = selectData(state) || [];
  const status = filterSelectors.selectStatusFilter(state);
  const statusCode = filterSelectors.selectStatusCodeFilter(state);
  const statusPercentage = filterSelectors.selectStatusPercentageFilter(state);

  // prettier-ignore
  const filteredData = allData.filter((item) => {
    const statusMatch = status === "all" || item.status === status;
    const statusCodeMatch = statusCode === "all" || item.statusCode === statusCode;
    const statusPercentageMatch = statusPercentage === "all" || item.statusPercentage === statusPercentage;

    return statusMatch && statusCodeMatch && statusPercentageMatch
  }) ?? []

  return filteredData;
};

// !Uncaught TypeError: Cannot assign to read only property '0' of object '[object Array]'
// !this error could come from Immer used by redux toolkit, that prevent to modify the array: to investigate
// !étrange que cela ne fonctionne pas alors que ci-dessus il n'y a pas de problème avec filter
// !The Array.prototype.sort() method sorts the elements of an array in place and returns the sorted array.
// !The issue is that the Redux state should be immutable - you shouldn't be modifying the state directly, only through dispatching actions.
const selectSortedData = (state) => {
  const allData = selectData(state) || [];
  const sort = filterSelectors.selectSort(state);

  const sortedData = [...allData].sort((a, b) => {
    if (sort === "asc") {
      return a.title > b.title ? 1 : -1;
    } else {
      return a.title < b.title ? 1 : -1;
    }
  });

  console.log("sortedData", sortedData);
  return sortedData;
};

// prettier-ignore
const selectAllFilters = (state) => {
  let allData = selectData(state) || [];
  
  const searchedData = selectSearchedData({ ...state, data: { ...state.data, data: { data: allData } } });
  const filteredData = selectFilteredData({ ...state, data: { ...state.data, data: { data: searchedData } } });
  const sortedData = selectSortedData({ ...state, data: { ...state.data, data: { data: filteredData } } });

  return sortedData;
};

export const selectors = {
  selectData,
  selectSearchedData,
  selectFilteredData,
  selectSortedData,
  selectAllFilters,
  selectIsLoading,
  selectError,
};

export const { actions, reducer } = slice;

export const sagaActions = {
  sagaGetData: createAction(SAGA_FLOW_NAME.GET_DATA),
};
