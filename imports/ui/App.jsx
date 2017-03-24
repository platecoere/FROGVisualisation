import React, { Component } from 'react';
import MyChart from './MyChart.jsx';
import Pauses from './Pauses.jsx';
import Live from './Live.jsx';
import FastForward from './FastForward.jsx'; 
import WatchingSpeed from './WatchingSpeed.jsx';
import AreaChart from './AreaChart.jsx';


// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div>
        <Pauses/>
		<FastForward/>
		<WatchingSpeed/>
        <AreaChart/>
      </div>
    );
  }
}