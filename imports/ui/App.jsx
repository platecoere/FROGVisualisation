import React, { Component } from 'react';
import MyChart from './MyChart.jsx';
import Pauses from './Pauses.jsx';
import Live from './Live.jsx';
import DataHandler from './DataHandler';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div>
        <DataHandler />
        <Pauses />
      </div>
    );
  }
}
