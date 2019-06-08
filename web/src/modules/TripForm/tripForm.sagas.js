import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, TRIP } from 'Src/constants/actionTypes';

function* trip({ payload }) {
  const data = yield call(request, '/trips/create', payload.data);
  if (data.success) {
    yield put(action(SNACKBAR.SUCCESS, data.message));
    yield payload.push('/');
  } else {
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* tripFormSaga() {
  yield takeLatest(TRIP.CREATE.REQUEST, trip);
}

export default tripFormSaga;
