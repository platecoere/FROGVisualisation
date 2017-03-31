import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';

import { Times } from '../api/events'


const Pauses = ({ data }) => {

  const d = [['ID', 'X', 'Y', 'Nbr of Pauses']]
  if (data) {
    Object.keys(data.data).forEach(
      (key, index) => d.push([
        '', parseInt(key), data['data'][key], data['data'][key]
      ])
    )
  }

  return(<div>
    <h1>Visualisation</h1>
    <Chart
      chartType="BubbleChart"
      data={d}
      options={{
        title: 'Number of Pauses during Video',
        hAxis: { title: 'Time', minValue: 0, maxValue: 60, gridlines: { count: 5 }},
        vAxis: { minValue: 0, maxValue: 0, gridlines: { count: 0 }},
        colorAxis: {colors: ['white', 'red']}
      }}
      width={'1000px'}
      height={'500px'}
    />
  </div>);
}

export default createContainer(
  () => ({
    data: Times.findOne(),
  }), Pauses );