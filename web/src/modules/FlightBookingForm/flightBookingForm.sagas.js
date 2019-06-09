import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import {
  FLIGHT_BOOKING,
  SNACKBAR,
  FLIGHT_CHOICE
} from 'Src/constants/actionTypes';

function* flightBooking({ payload }) {
  if (!payload.data.seatingclass) payload.data.seatingclass = 'E';
  payload.data.source = 'CCU';
  payload.data.destination = 'BLR';
  payload.data.people = [1, 2];
  if (!payload.data.dateofdeparture) {
    yield put(action(SNACKBAR.DANGER, 'Fill all fields'));
    yield delay(3000);
    yield put(action(SNACKBAR.CLEAR));
  } else {
    payload.data.dateofdeparture = payload.data.dateofdeparture.replace(
      /-/g,
      ''
    );
    const data = yield call(request, '/bookings/flight/search', payload.data);
    if (data.success) yield put(action(FLIGHT_BOOKING.RECEIVE, data.data));
    else yield put(action(FLIGHT_BOOKING.ERROR));
  }
}

function* flightChoice({ payload }) {
  const data = yield call(request, '/bookings/flight/book', payload.data);
  if (data.success) {
    yield put(action(FLIGHT_CHOICE.RECEIVE));
    yield put(action(SNACKBAR.SUCCESS, data.msg));
    yield payload.push('/trips');
  } else {
    yield put(action(FLIGHT_CHOICE.ERROR));
    yield put(action(SNACKBAR.DANGER, 'Unable to book flight'));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* flightBookingFormSaga() {
  yield takeLatest(FLIGHT_BOOKING.REQUEST, flightBooking);
  yield takeLatest(FLIGHT_CHOICE.REQUEST, flightChoice);
}

export default flightBookingFormSaga;
