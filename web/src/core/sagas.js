import { all, put } from 'redux-saga/effects';
import { action } from 'Src/utils';
import { registerFormSaga } from 'Src/modules/RegisterForm';
import { loginFormSaga } from 'Src/modules/LoginForm';
import { AUTH, LOADING } from 'Src/constants/actionTypes';

function* init() {
  process.env.NODE_ENV === 'development' &&
    console.log('🍪🍪🍪 cookies:', document.cookie || 'none');
  if (document.cookie.includes('connect.sid'))
    yield put(action(AUTH.RECEIVE, true));
  yield put(action(LOADING.START, false));
}

export function* rootSaga() {
  yield all([init(), registerFormSaga(), loginFormSaga()]);
}

export default rootSaga;
