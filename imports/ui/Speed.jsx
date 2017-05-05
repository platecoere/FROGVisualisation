import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';
import TC from './TimeComponent.jsx';

import { Status } from '../api/events';

// -----------------------------------------------------------------
// TODO
// - Students finished ok?
// -----------------------------------------------------------------

const progress = (status, now) => {
  var mySpeed = status.speed
  if (isNaN(mySpeed)) {
    mySpeed = 1.0
  }
  if (status.state == 'Pausing') {
    mySpeed = 0.0
  }
  return (now - status.timeStamp) * mySpeed / 1000
}

const Speed = ({ data, timeNow }) => {

  const number = {slow: 0, normal: 0, fast: 0, done: 0}

  data.forEach(e => {
    if (parseFloat(e.speed) < 1.0) {
      number.slow++
    }
    if (parseFloat(e.speed) == 1.0) {
      number.normal++
    }
    if (parseFloat(e.speed) > 1.0) {
      number.fast++
    }
    if (e.currentTime + progress(e, timeNow) > 750) {
      number.done++
    }
  })

  return(
  <div>
    <h1>Watching Speeds</h1>
    <Chart
      chartType="PieChart"
      width="100%"
      data={[["type","n of event"],['Slow', number.slow],['Normal', number.normal], ['Fast', number.fast], ['Done', number.done]]}
      options={{
        //"title" : "Proportions of Watching Speeds",
        "is3D" : false,
        "pieHole" : 0.4,
        "slices" : [{color: 'red'}, {color: 'green'}, {color: 'blue'}, {color: 'black'}],
        backgroundColor: { fill:'transparent' },
        fontSize: 16,
        fontName: 'Avenir',
        
      }}
      width={'1200px'}
      height={'350px'}
    />
  </div>);
}

const T = (props) => {
  return (<TC component={Speed} interval={5000} props={props}/>)
}

export default createContainer(
  () => ({
    data: Status.find().fetch()
  }),
  T
);




