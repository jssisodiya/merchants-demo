import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/reducer';

const configureStore = preloadedState => {
  const enhancers = [applyMiddleware(thunk)];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  return createStore(reducers, preloadedState, compose(...enhancers));
};

export default configureStore;
