import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';
import config from './config';

import { Times } from '../api/events'


// -----------------------------------------------------------------
// TODO
// - nothing for the moment
// -----------------------------------------------------------------

const Pauses = ({ data }) => {
  
  const d = [['ID', 'X', 'Y', 'Nbr of Pauses']]

  if (data) {
    Object.keys(data.data).forEach(
      (key, index) => {
        if(data['data'][key] > config.thresholdPauses) {
          d.push([
            '', 
            parseInt(key), 
            0, 
            data['data'][key]
          ])
        }
      }
    )
  }
  
  return(
    <div>
    <h1>Pauses</h1>
    {d.length > 2 && <Chart
      chartType="BubbleChart"
      data={d}
      options={{
        title: 'Pauses during Video',
        hAxis: { title: 'Time', minValue: 0, maxValue: config.videoLength, gridlines: { count: 5 }},
        vAxis: { minValue: 0, maxValue: 0, gridlines: { count: 0 }},
        colorAxis: {colors: ['yellow', 'red']},
        bubble: {opacity: 0.5},
        enableInteractivity: 'true',
        backgroundColor: { fill:'transparent' },
        sizeAxis: {minSize: 25, maxSize: 25},
        fontSize: 16,
        //fontName: 'Avenir',
        chartArea: {width: '90%', height: '60%'}
      }}
      width={'1200px'}
      height={'200px'}
    />}
  </div>);
}

export default createContainer(
  () => ({
    data: Times.findOne(),
  }), Pauses );
