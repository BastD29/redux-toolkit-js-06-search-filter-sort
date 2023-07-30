import { combineReducers } from "redux";
import { dataReducer } from "./data";
import { searchReducer } from "./search";
import { filterReducer } from "./filter";

export const rootReducer = combineReducers({
  data: dataReducer,
  search: searchReducer,
  filter: filterReducer,
});
