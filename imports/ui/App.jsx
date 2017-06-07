import React, { Component } from 'react';
import DataHandler from './DataHandler';

import Evolution from './Evolution.jsx';
import PausesNew from './PausesNew.jsx';
import Speed from './Speed.jsx';

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