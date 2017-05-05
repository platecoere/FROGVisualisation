import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';
//import TC from './TimeComponent.jsx'

import { Times } from '../api/events'

const Pauses = ({ data }) => {
  
  const d = [['ID', 'X', 'Y', 'Nbr of Pauses']]

  if (data) {
    Object.keys(data.data).forEach(
      (key, index) =>
        d.push([
          '', 
          parseInt(key), 
          0, 
          data['data'][key]
        ])
    )
  }

  return(
    <div>
    <h1>Pauses</h1>
    <Chart
      chartType="BubbleChart"
      data={d.filter(x => x[3] > 2 || x[3] == 'Nbr of Pauses')}
      options={{
        title: 'Pauses during Video',
        hAxis: { title: 'Time', minValue: 0, maxValue: 60, gridlines: { count: 5 }},
        vAxis: { minValue: 0, maxValue: 0, gridlines: { count: 0 }},
        colorAxis: {colors: ['white', 'red']}
      }}
      width={'1000px'}
      height={'200px'}
    />
  </div>);
}

export default createContainer(
  () => ({
    data: Times.findOne(),
  }), Pauses );
