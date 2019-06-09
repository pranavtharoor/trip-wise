import reducer from 'Src/utils/reducer';
import { TRIP_FORM, TRIP } from 'Src/constants/actionTypes';

const actionHandlers = {
  [TRIP_FORM.TOGGLE]: s => ({ ...s, formShown: !s.formShown }),
  [TRIP.CREATE.RECEIVE]: s => ({ ...s, formShown: false })
};

const initialState = {
  formShown: false
};

export default reducer(initialState, actionHandlers);
