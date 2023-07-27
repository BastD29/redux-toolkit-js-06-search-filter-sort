import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { dataReducer } from "./data";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: dataReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

// const instance = () => store;
// export default instance;

export default store;
