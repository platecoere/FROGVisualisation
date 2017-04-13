import React, { Component } from 'react';
import Pauses from './Pauses.jsx';
import Multidimensional from './Multidimensional.jsx';

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
        <Multidimensional/>
        <WatchingSpeed/>
        <Pauses/>
        <FastForward/>
      </div>
    );
  }
}

//        <AreaChart/>
//        <Multidimensional/>