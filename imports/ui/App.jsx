import React, { Component } from 'react';
import Pauses from './Pauses.jsx';
import Multidimensional from './Multidimensional.jsx';
import Evolution from './Evolution.jsx';

import DataHandler from './DataHandler';
import FastForward from './FastForward.jsx'; 
import WatchingSpeed from './WatchingSpeed.jsx';
import AreaChart from './AreaChart.jsx';
import Speed from './Speed.jsx';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div>
        <DataHandler/>
        <Speed/>
        <Evolution/>
        <WatchingSpeed/>
        <Pauses/>
        <FastForward/>
      </div>
    );
  }
}

//        <AreaChart/>
//        <Multidimensional/>