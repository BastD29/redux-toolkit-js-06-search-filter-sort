import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    status: "all",
    statusCode: "all",
    statusPercentage: "all",
  },
  sort: "asc",
};

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter[action.payload.filterType] = action.payload.filterValue;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

const selectStatusFilter = (state) => state.filter.filter.status;
const selectStatusCodeFilter = (state) => state.filter.filter.statusCode;
// prettier-ignore
const selectStatusPercentageFilter = (state) => state.filter.filter.statusPercentage;
const selectSort = (state) => state.filter.sort;

export const selectors = {
  selectStatusFilter,
  selectStatusCodeFilter,
  selectStatusPercentageFilter,
  selectSort,
};

export const { actions, reducer } = slice;
