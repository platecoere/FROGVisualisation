import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';
import TC from './TimeComponent.jsx';


import { Status } from '../api/events'

// -----------------------------------------------------------------
// TODO
// - Some numbers are negative - Math.abs(...) not enough
// - NBR OF STUDENTS IN EACH TIME WINDOW -> aggregate
// - missing slow and fast students, find out why ?
// - Find out about the NaNs
// -----------------------------------------------------------------

const progress = (status, now) => {

  // console.log('hello')
  // console.log(now)
  // console.log(status.timeStamp)
  // console.log(now - status.timeStamp)

  //console.log("Hello")
  var mySpeed = status.speed
  if (mySpeed == 'None') {
    mySpeed = 1.0
  }
  if (status.state == 'Pausing') {
    mySpeed = 0.0
  }
  return Math.abs(now - status.timeStamp) * mySpeed / 1000
}

const g = s => s < 1 ? 1 : (s > 1 ? 3 : 2)
const f = (s, p) => p == 'Pausing' ? 0 : g(s)
const myRound = (i, v) => Math.round(i/v) * v

const Evolution = ({ myData, timeNow }) => {

  const d = [['ID', 'X', 'current status', 'size', 'size2']]
  const windows = {};

  if (myData.length > 0) {

    myData.forEach(
      status => {
        const x = myRound(status.currentTime + progress(status, timeNow), 30)
        const y = f(status.speed, status.state)

        // if(y.isNaN()){
        //   console.log('NAAAAN')
        //   console.log(status)
        // }

        if (x in windows) {
          if(y in windows[x]){
            ++windows[x][y]
          } else {
            windows[x][y] = 1
          }
        } else {
          windows[x] = {}
          windows[x][y] = 1
        }
      }
    )
  }

  Object.keys(windows).forEach(
    x => Object.keys(x).forEach(
      y => d.push(['', parseFloat(x), parseFloat(y), windows[x][y], windows[x][y]])
    )
  )

  return(
    <div>
    <h1>Evolution</h1>
    <Chart
      chartType="BubbleChart"
      data={d}
      options={{
        title: 'Evolution of the Students',
        hAxis: { title: 'Time', minValue: 0, maxValue: 1200, gridlines: { count: 7 }}, // time axis
        vAxis: { minValue: -1, maxValue: 3, gridlines: { count: 0 }},
        colorAxis: {colors: ['purple', 'red', 'green']}
      }}
      width={'1000px'}
      height={'600px'}
    />
  </div>);
}

const T = (props) => {
  return (<TC component={Evolution} interval={5000} props={props}/>)
}

export default createContainer(
  () => ({
    myData: Status.find().fetch()
  }),
  T
);
