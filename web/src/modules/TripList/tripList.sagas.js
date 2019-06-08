import { call, put, takeLatest } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { TRIP } from 'Src/constants/actionTypes';

function* trip() {
  const data = yield call(request, '/trips');
  if (data.success) yield put(action(TRIP.FETCH.RECEIVE, data.data));
}

function* tripListSaga() {
  yield takeLatest(TRIP.FETCH.REQUEST, trip);
}

export default tripListSaga;
