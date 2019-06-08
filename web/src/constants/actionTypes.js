import { createNetworkConstants } from 'Src/utils';

export const AUTH = createNetworkConstants('AUTH');

export const LOADING = {
  START: 'LOADING.START',
  DONE: 'LOADING.DONE'
};

export const SNACKBAR = {
  INFO: 'SNACKBAR.INFO',
  SUCCESS: 'SNACKBAR.SUCCESS',
  DANGER: 'SNACKBAR.DANGER',
  CLEAR: 'SNACKBAR.CLEAR'
};
