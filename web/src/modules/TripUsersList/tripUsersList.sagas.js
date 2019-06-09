import { call, put, takeLatest } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { TRIP_USERS } from 'Src/constants/actionTypes';

function* tripUsers({ payload }) {
  const data = yield call(request, `/trips/${payload}`);
  if (data.success) yield put(action(TRIP_USERS.FETCH.RECEIVE, data.data));
}

function* tripUsersListSaga() {
  yield takeLatest(TRIP_USERS.FETCH.REQUEST, tripUsers);
  // yield takeLatest(TRIP_USERS.CREATE.RECEIVE, tripUsers);
}

export default tripUsersListSaga;
