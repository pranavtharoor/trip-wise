import asyncComponent from 'Src/enhancers/asyncComponent';
import reducer from './trip.reducer';

export const tripsReducer = reducer;

export default asyncComponent(() => import('./trip.container'));
