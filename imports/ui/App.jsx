import React, { Component } from 'react';
import DataHandler from './DataHandler';

import Pauses from './Pauses.jsx';
import Evolution from './Evolution.jsx';
import Speed from './Speed.jsx';

import PausesNew from './PausesNew.jsx';


// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div>
        <DataHandler/>
        <Evolution/>
        <PausesNew/>
        <Speed/>
      </div>
    );
  }
}