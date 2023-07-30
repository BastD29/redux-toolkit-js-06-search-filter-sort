import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
});

const selectSearchTerm = (state) => state.search.searchTerm;

export const selectors = {
  selectSearchTerm,
};

export const { actions, reducer } = slice;
