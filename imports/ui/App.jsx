import React, { Component } from 'react';
import DataHandler from './DataHandler';

import Pauses from './Pauses.jsx';
import Evolution from './Evolution.jsx';
import Speed from './Speed.jsx';

import WatchingSpeed from './WatchingSpeed.jsx';
import Multidimensional from './Multidimensional.jsx';
import FastForward from './FastForward.jsx'; 


// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div>
        <DataHandler/>
        <Speed/>
        <Pauses/>
        <Evolution/>
      </div>
    );
  }
}

//        <Multidimensional/>
//        <Pauses/>