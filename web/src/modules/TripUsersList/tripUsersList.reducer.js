import reducer from 'Src/utils/reducer';
import { TRIP_USERS } from 'Src/constants/actionTypes';

const actionHandlers = {
  [TRIP_USERS.FETCH.RECEIVE]: (s, a) => [...a.payload]
};

const initialState = [];

export default reducer(initialState, actionHandlers);
