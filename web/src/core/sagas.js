import { all, put } from 'redux-saga/effects';
import { action } from 'Src/utils';
import { registerFormSaga } from 'Src/modules/RegisterForm';
import { loginFormSaga } from 'Src/modules/LoginForm';
import { tripFormSaga } from 'Src/modules/TripForm';
import { tripListSaga } from 'Src/modules/TripList';
import { tripUsersListSaga } from 'Src/modules/TripUsersList';
import { flightBookingFormSaga } from 'Src/modules/FlightBookingForm';
import { AUTH, LOADING } from 'Src/constants/actionTypes';

function* init() {
  process.env.NODE_ENV === 'development' &&
    console.log('🍪🍪🍪 cookies:', document.cookie || 'none');
  if (document.cookie.includes('connect.sid'))
    yield put(action(AUTH.RECEIVE, true));
  yield put(action(LOADING.START, false));
}

export function* rootSaga() {
  yield all([
    init(),
    tripFormSaga(),
    registerFormSaga(),
    loginFormSaga(),
    tripListSaga(),
    flightBookingFormSaga(),
    tripUsersListSaga()
  ]);
}

export default rootSaga;
