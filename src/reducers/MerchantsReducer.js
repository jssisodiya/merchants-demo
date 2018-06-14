import _cloneDeep from 'lodash/cloneDeep';
import _map from 'lodash/map';

// Utils
import utils from '../utils';

// InitialState
import initialStateData from '../InitialState';

const initialState = initialStateData.merchants;

var MerchantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MERCHANTS_SUCCESS':
      const { requestFor } = action.meta;
      var newState = _cloneDeep(state);
      const merchants = action.response.merchants;
      let merchantList = newState.merchantList[requestFor] || [];
      _map(merchants, merchant => {
        if (!utils.isInArray(merchantList, merchant.id)) {
          merchantList.push(merchant.id);
        }
        newState.merchantMap[merchant.id] = merchant;
      });
      newState.merchantList[requestFor] = merchantList;
      if (action.response.total) {
        newState.merchantGrid[requestFor] = {
          total: action.response.total,
          page: action.response.page,
          limit: action.response.limit
        };
      }
      return newState;

    case 'CREATE_MERCHANT_SUCCESS':
      var newState = _cloneDeep(state);
      var merchant = action.response;
      if (merchant) {
        newState.merchantMap[merchant.id] = merchant;
        return newState;
      } else {
        return state;
      }

    case 'MERCHANT_SUCCESS':
      var newState = _cloneDeep(state);
      var merchant = action.response.merchant;
      if (merchant) {
        newState.merchantMap[merchant.id] = merchant;
        return newState;
      } else {
        return state;
      }

    case 'DELETE_MERCHANT_SUCCESS':
      var newState = _cloneDeep(state);
      var merchant = action.response;
      if (merchant) {
        newState.merchantMap[merchant.id] = null;
        return newState;
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default MerchantsReducer;
