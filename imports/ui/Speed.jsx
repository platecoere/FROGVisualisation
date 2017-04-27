import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';
import TC from './TimeComponent.jsx';

import { Status } from '../api/events';

// ADD STUDENTS FINISHED --------------------

const progress = (status, now) => {
  var mySpeed = status.speed
  if (mySpeed == 'None') {
    mySpeed = 1.0
  }
  if (status.state == 'Pausing') {
    mySpeed = 0.0
  }
  return (now - status.timeStamp) * mySpeed / 1000
}

const Speed = ({ data, timeNow }) => {
  //console.log(data)

  const number = {slow: 0, normal: 0, fast: 0, done: 10}

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
  //console.log("Updated")

  //console.log(number)

  return(
  <div>
    <p>Watching Speeds</p>
    <Chart
      chartType="PieChart"
      width="100%"
      data={[["type","n of event"],['Slow', number.slow],['Normal', number.normal], ['Fast', number.fast], ['Done', number.done]]}
      options={{
        "title" : "Proportions of Watching Speeds",
        "is3D" : false,
        "pieHole" : 0.4,
        "slices" : [{color: 'red'}, {color: 'green'}, {color: 'blue'}, {color: 'black'}]
      }}
    />
  </div>);
}

const T = (props) => {
  //console.log(props)
  return (<TC component={Speed} interval={5000} props={props}/>)
}


export default createContainer(
  () => ({
    data: Status.find().fetch()
  }),
  T
);




