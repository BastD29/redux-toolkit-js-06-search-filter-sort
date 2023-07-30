import { combineReducers } from "redux";
import { dataReducer } from "./data";
import { searchReducer } from "./search";

export const rootReducer = combineReducers({
  data: dataReducer,
  search: searchReducer,
});
