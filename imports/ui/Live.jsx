import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import RTChart from 'react-rt-chart';

export default class Pauses extends Component {
  componentDidMount() {
    setInterval(() => this.forceUpdate(), 1000);
  }

	render() {
    var data = {
      date: new Date(),
      Car: getRandomValue(),
      Bus: getRandomValue()
    };

    return <RTChart
      fields={['Car','Bus']}
      data={data} 
    />
  }
}