import MockApi from '../MockApi';

export function createMerchant(payload, meta) {
  return dispatch => {
    dispatch({ type: 'CREATE_MERCHANT_REQUEST', meta });
    MockApi.post(`a1:merchants`, payload)
      .then(response => {
        dispatch({ type: 'CREATE_MERCHANT_SUCCESS', response, meta });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_MERCHANT_ERROR', meta: { ...meta, ...err } });
      });
  };
}

export function deleteMerchant(payload, meta) {
  return dispatch => {
    dispatch({ type: 'DELETE_MERCHANT_REQUEST', meta });
    MockApi.delete(`a1:merchants`, payload)
      .then(response => {
        dispatch({ type: 'DELETE_MERCHANT_SUCCESS', response, meta });
      })
      .catch(err => {
        dispatch({ type: 'DELETE_MERCHANT_ERROR', meta: { ...meta, ...err } });
      });
  };
}

export function fetchMerchants(payload, meta) {
  return dispatch => {
    dispatch({ type: 'MERCHANTS_REQUEST', meta });
    MockApi.get(`a1:merchants`, payload)
      .then(response => {
        dispatch({ type: 'MERCHANTS_SUCCESS', response, meta });
      })
      .catch(err => {
        dispatch({ type: 'MERCHANT_ERROR', meta: { ...meta, ...err } });
      });
  };
}

export function fetchMerchant(payload, meta) {
  return dispatch => {
    dispatch({ type: 'MERCHANT_REQUEST', meta });
    MockApi.get(`a1:merchants`, payload)
      .then(response => {
        dispatch({ type: 'MERCHANT_SUCCESS', response, meta });
      })
      .catch(err => {
        dispatch({ type: 'MERCHANT_ERROR', meta: { ...meta, ...err } });
      });
  };
}
