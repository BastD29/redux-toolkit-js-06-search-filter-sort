import { all } from "redux-saga/effects";
import { dataSagas } from "./data";

export default function* rootSaga() {
  yield all([...dataSagas]);
}
