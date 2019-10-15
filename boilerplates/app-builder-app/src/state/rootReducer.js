import { combineReducers } from 'redux';
import { api, currentUser } from '@entando/apimanager';
import { reducer as form } from 'redux-form';

import locale from 'state/locale/reducer';
import { messages } from '@entando/messages';
import loading from 'state/loading/reducer';
import modal from 'state/modal/reducer';
import pagination from 'state/pagination/reducer';

export const APP_NAME = combineReducers({
  // implement here your app specific reducers
});

export default combineReducers({
  apps: combineReducers({ APP_NAME }),
  api,
  currentUser,
  form,
  loading,
  locale,
  messages,
  modal,
  pagination,
});
