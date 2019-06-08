import reducer from 'Src/utils/reducer';
import { FLIGHT_BOOKING } from 'Src/constants/actionTypes';

const actionHandlers = {
  [FLIGHT_BOOKING.RECEIVE]: (s, a) => ({
    ...s,
    available: [...(a.payload ? a.payload : [])]
  })
};

const initialState = {
  available: []
};

export default reducer(initialState, actionHandlers);
