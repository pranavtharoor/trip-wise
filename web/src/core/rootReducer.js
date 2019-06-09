import { combineReducers } from 'redux';
import { snackbarReducer } from 'Src/modules/Snackbar';
import { tripListReducer } from 'Src/modules/TripList';
import { flightBookingFormReducer } from 'Src/modules/FlightBookingForm';
import { tripUsersListReducer } from 'Src/modules/TripUsersList';
import { tripsReducer } from 'Src/routes/Trips';
import { appReducer } from 'Src/core/App';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  snackbar: snackbarReducer,
  app: appReducer,
  form: formReducer,
  trips: tripListReducer,
  flights: flightBookingFormReducer,
  trip: tripsReducer,
  tripUsers: tripUsersListReducer
});
