import _cloneDeep from 'lodash/cloneDeep';

// InitialState
import initialStateData from '../InitialState';

const initialState = initialStateData.status;

var StatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MERCHANTS_REQUEST':
    case 'MERCHANT_REQUEST':
    case 'CREATE_MERCHANT_REQUEST':
    case 'DELETE_MERCHANT_REQUEST':
      var newState = _cloneDeep(state);
      var { request, requestFor } = action.meta;
      var status = newState[request][requestFor] || {};
      status.progress = 'fetching';
      newState[request][requestFor] = status;
      return newState;

    case 'MERCHANTS_SUCCESS':
    case 'MERCHANT_SUCCESS':
    case 'CREATE_MERCHANT_SUCCESS':
    case 'DELETE_MERCHANT_SUCCESS':
      var newState = _cloneDeep(state);
      var { request, requestFor } = action.meta;
      var status = newState[request][requestFor] || {};
      status.progress = 'fetched';
      status.lastFetched = new Date().getTime();
      if (action.meta.saveResponse) {
        status.response = action.response;
      }
      newState[request][requestFor] = status;
      return newState;

    case 'MERCHANTS_ERROR':
    case 'MERCHANT_ERROR':
    case 'CREATE_MERCHANT_ERROR':
    case 'DELETE_MERCHANT_ERROR':
      var newState = _cloneDeep(state);
      var { request, requestFor } = action.meta;
      var status = newState[request][requestFor] || {};
      status.progress = 'error';
      status.message = action.meta && action.meta.message;
      status.data = action.meta;
      newState[request][requestFor] = status;
      return newState;

    default:
      return state;
  }
};

export default StatusReducer;
