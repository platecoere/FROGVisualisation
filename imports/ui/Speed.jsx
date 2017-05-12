import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';
import TC from './TimeComponent.jsx';
import config from './config';
import utils from './utils';

import { Status } from '../api/events';

// -----------------------------------------------------------------
// TODO
// - don't display while size < x
// -----------------------------------------------------------------

const removeUndefSpeed = speed => !speed ? 1.0 : speed

const Speed = ({ data, timeNow }) => {

  const number = {slow: 0, normal: 0, fast: 0, done: 0, pausing: 0}
  var flag = 0

  data.forEach(e => {
    if (e.currentTime + utils.progress(e, timeNow) > config.videoLength) {
      number.done++
    } else {
      if (e.state == 'Pausing') {
        number.pausing++
      } else {
        if (e.speed < 1.0) {
          number.slow++
        }
        if (e.speed == 1.0) {
          number.normal++
        }
        if (e.speed > 1.0) {
          number.fast++
        }
      }
    }
  })

  return(
  <div>
    <h1>Watching Speeds</h1>
    {data.length > 1 && <Chart
      chartType="PieChart"
      width="100%"
      data={[["type","n of event"],['Pausing', number.pausing],['Slow', number.slow],['Normal', number.normal], ['Fast', number.fast], ['Done', number.done]]}
      options={{
        "title" : "Proportions of Watching Speeds",
        "is3D" : false,
        "pieHole" : 0.45,
        "slices" : [{color: '#660198'}, {color: 'red'}, {color: 'green'}, {color: 'blue'}, {color: 'black'}],
        backgroundColor: { fill:'transparent' },
        fontSize: 16,
        legend: {position: 'left', alignment: 'center'},
        pieSliceTextStyle: {fontSize: 16},
        chartArea: {width: '80%', height: '80%'}
        //fontName: 'Avenir',
        
      }}
      width={'1000px'}
      height={'400px'}
    />}
  </div>);
}

const timeComponent = (props) => {
  return (<TC component={Speed} interval={config.timeComponentInterval / config.accelerationFactor} props={props}/>)
}

export default createContainer(
  () => ({
    data: Status.find().fetch()
  }),
  timeComponent
);




