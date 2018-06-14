import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';

import Merchants from './pages/Merchants';
import NewMerchant from './pages/NewMerchant';
import EditMerchant from './pages/EditMerchant';
import MerchantDetail from './pages/MerchantDetail';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar is-dark" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <h2 className="is-size-2">
                <span role="img" aria-label="Logo">
                  🚗
                </span>{' '}
              </h2>
              &nbsp;&nbsp;
              <h4 className="is-size-4 has-text-weight-bold has-text-primary">
                Bid-a-Car
              </h4>
            </Link>
          </div>
        </nav>
        <div className="container">
          <div style={{ padding: '12px', margin: '24px 0px' }}>
            <Route path="/" exact component={Merchants} />
            <Switch>
              <Route path="/merchants/new" exact component={NewMerchant} />
              <Route
                path="/merchants/:merchantId"
                exact
                component={MerchantDetail}
              />
              <Route
                path="/merchants/edit/:merchantId"
                exact
                component={EditMerchant}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
