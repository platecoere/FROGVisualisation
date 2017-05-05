import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';
import TC from './TimeComponent.jsx';


import { Status } from '../api/events'

// -----------------------------------------------------------------
// TODO
// - Some numbers are negative...
// - Missing slow and fast students, find out why ?
// - Find out about the NaNs
// - Use color to show students pausing
// -----------------------------------------------------------------

var max = 0
var current = 0

const progress = (status, now) => {
  //console.log("Hello")
  var mySpeed = status.speed
  /*if (isNaN(mySpeed)) {
    mySpeed = 1.0
  }*/
  if (!mySpeed) {
    mySpeed = 1.0
  }
  if (status.state == 'Pausing') {
    mySpeed = 0.0
  }
  // if (now - status.timeStamp < 0) {
  //   return 0
  // }
    /*console.log('now : ')
    console.log(now)
    console.log('timeStamp : ')
    console.log(status.timeStamp)
    console.log('diff : ')
    current = Math.abs(now - status.timeStamp)
    console.log(current)
    if (current > max) {
      max = current
    }
    console.log(max)
    console.log('---------------------')
  }*/
  return (now - status.timeStamp) * mySpeed / 1000
}

const g = s => s < 1 ? 1 : (s > 1 ? 3 : 2)
//const g2 = s => s < 1 ? -1 : (s > 1 ? 1 : 0)
const f = (s, p) => p == 'Pausing' ? 0 : g(s)

const p = s => {
  if (s == 'Pausing') {
    return 1
  } else {
    return 0
  }
}

const myRound = (i, v) => Math.round(i/v) * v

const maxVal = 750

const myFunc = x => x > maxVal ? maxVal : x

const Evolution = ({ myData, timeNow }) => {

  const d = [['ID', 'X', 'current status', 'size', 'size2']]

  const windows = {};

  if (myData.length > 0) {

    myData.forEach(
      status => {
        const x = myFunc(myRound(status.currentTime + progress(status, timeNow), 30))
        //const x = myRound(status.currentTime, 30)
        const y = f(status.speed, status.state)

        if(isNaN(x)) {
          console.log('x is NaN')
          console.log(status.speed)
        }

        if(isNaN(y)) {
          console.log('y is NaN')
          console.log(status)
        }

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
        //title: 'Evolution of the Students',
        hAxis: { title: 'Time', minValue: -100, maxValue: 750, gridlines: { count: 5 }}, // time axis
        vAxis: { minValue: -1, maxValue: 3, gridlines: { count: 0 }},
        colorAxis: {colors: ['green', 'orange', 'red']},
        enableInteractivity: 'true',
        backgroundColor: { fill:'transparent'},
        //backgroundColor: { fill:'white', stroke: 'black', strokeWidth: 2}
        fontSize: 16,
        fontName: 'Avenir',
        chartArea: {width: '90%', height: '80%'}
      }}
      width={'1000px'}
      height={'500px'}
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
