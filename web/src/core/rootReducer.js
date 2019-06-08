import { combineReducers } from 'redux';
import { snackbarReducer } from 'Src/modules/Snackbar';
import { tripListReducer } from 'Src/modules/TripList';
import { appReducer } from 'Src/core/App';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  snackbar: snackbarReducer,
  app: appReducer,
  form: formReducer,
  trips: tripListReducer
});
