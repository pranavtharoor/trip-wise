import reducer from 'Src/utils/reducer';
import { TRIP } from 'Src/constants/actionTypes';

const actionHandlers = {
  [TRIP.FETCH.RECEIVE]: (s, a) => [...a.payload]
};

const initialState = [];

export default reducer(initialState, actionHandlers);
