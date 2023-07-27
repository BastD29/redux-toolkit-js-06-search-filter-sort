import {
  actions as dataActions,
  selectors as dataSelectors,
  reducer as dataReducer,
  sagaActions as dataSagaActions,
} from "./slice";

import { dataFlows as _dataFlows, dataSagas as _dataSagas } from "./sagas";

// !Uncaught TypeError: _dataXXX is not iterable
// const dataSagas = [..._dataSagas];
// const dataFlows = [..._dataFlows];

const dataSagas = _dataSagas;
const dataFlows = _dataFlows;

export {
  dataSagas,
  dataFlows,
  //
  dataActions,
  dataSagaActions,
  dataSelectors,
  dataReducer,
};
