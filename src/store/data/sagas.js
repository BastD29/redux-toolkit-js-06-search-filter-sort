import { call, fork, put, takeLatest } from "redux-saga/effects";
import { dataActions } from ".";
import { GetCampaigns } from "../../services/campaigns.service";

export const SAGA_FLOW_NAME = {
  GET_DATA: "GET_DATA",
};

function* getData() {
  try {
    yield put(dataActions.fetchDataRequest());

    const data = yield call(GetCampaigns);

    yield put(dataActions.fetchDataSuccess(data));
  } catch (error) {
    yield put(dataActions.fetchDataFailure(error));
  } finally {
    yield put(dataActions.fetchDataRequest(false));
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchGetData() {
  yield takeLatest(SAGA_FLOW_NAME.GET_DATA, getData);
}

//=====================================
//  SAGAS
//-------------------------------------

export const dataSagas = [fork(watchGetData)];

//=====================================
//  FLOWS
//-------------------------------------

export const dataFlows = {
  dataSagas,
};
