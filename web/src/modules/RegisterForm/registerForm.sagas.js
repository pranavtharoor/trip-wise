import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, REGISTER } from 'Src/constants/actionTypes';

function* register({ payload }) {
  const data = yield call(request, '/auth/signup', payload.data);
  if (data.success) {
    yield put(action(SNACKBAR.SUCCESS, data.message));
    yield payload.push('/');
  } else {
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* registerFormSaga() {
  yield takeLatest(REGISTER.REQUEST, register);
}

export default registerFormSaga;
