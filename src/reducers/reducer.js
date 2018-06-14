import { combineReducers } from 'redux';

import MerchantsReducer from './MerchantsReducer';
import StatusReducer from './StatusReducer';

export default combineReducers({
  merchants: MerchantsReducer,
  status: StatusReducer
});
