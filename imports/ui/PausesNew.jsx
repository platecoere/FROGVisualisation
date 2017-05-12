import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';
import config from './config';

import { Times } from '../api/events'


// -----------------------------------------------------------------
// TODO
// - nothing for the moment
// -----------------------------------------------------------------


const PausesNew = ({ data }) => {
  
  const d = [['Time', 'Pauses']]

  if (data) {
    Object.keys(data.data).forEach(
      (key, index) => {
        if(data['data'][key] > config.thresholdPauses) {
          d.push([
            parseInt(key), 
            data['data'][key]
          ])
        }
      }
    )
  }

  return(
    <div>
    <h1>PausesNew</h1>
    {d.length > 2 && <Chart
      chartType="ScatterChart"
      data={d}
      options={{
        title: 'Pauses during Video',
        hAxis: { title: 'Time', minValue: 0, maxValue: config.videoLength, gridlines: { count: 5, color: 'transparent'}, viewWindow: {max : 800}},
        vAxis: { title: 'Number of Pauses', minValue: 0, gridlines: { count: 5, color: 'transparent' }},
        enableInteractivity: 'true',
        backgroundColor: { fill:'transparent' },
        fontSize: 16,
        colors: ['#660198'],
        pointShape: 'diamond',
        pointSize: 12,
        //fontName: 'Avenir',
        chartArea: {width: '80%', height: '60%'},
        legend: { position: 'none'}
      }}
      width={'1400px'}
      height={'400px'}
    />}
  </div>);
}

export default createContainer(
  () => ({
    data: Times.findOne(),
  }), PausesNew );
