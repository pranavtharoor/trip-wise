import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { AUTH, SNACKBAR } from 'Src/constants/actionTypes';

function* login({ payload }) {
  if (!payload.data.email || !payload.data.password) {
    yield put(action(SNACKBAR.DANGER, 'Fill all fields'));
  } else {
    const data = yield call(request, '/auth/login', payload.data);
    if (data.success) {
      yield put(action(SNACKBAR.SUCCESS, data.msg));
      yield put(action(AUTH.RECEIVE));
      yield payload.push('/trips');
    } else {
      yield put(action(SNACKBAR.DANGER, data.msg));
    }
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* loginFormSaga() {
  yield takeLatest(AUTH.REQUEST, login);
}

export default loginFormSaga;
