import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

import MerchantForm from './components/MerchantForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div>
          <MerchantForm />
        </div>
      </div>
    );
  }
}

export default App;
