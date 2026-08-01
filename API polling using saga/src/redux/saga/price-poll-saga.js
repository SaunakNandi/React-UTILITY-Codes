import { call, delay, put, race, take, takeLatest } from "redux-saga/effects";

const FetchAPI = async (symbol) => {
  try {
    const res = await fetch(`/api/fetch-live-price?id=${symbol}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error ", error);
    throw new Error(error);
  }
};
export function* PricePollWorker(action) {
  while (true) {
    try {
      const data = yield call(FetchAPI, action.payload.symbol);
      yield put({ type: "FETCH_PRICE_SUCCESS", payload: data });
    } catch (error) {
      console.log("Error ", error);
      yield put({ type: "FETCH_PRICE_FAIL", payload: error });
    }
    yield delay(5000);
  }
}

export function* PricePollSaga() {
  yield takeLatest("START_POLLING", function* (action) {
    yield race({
      task: call(PricePollWorker, action),
      cancel: take(["STOP_POLLING", "LOGOUT"]),
    });
  });
}
