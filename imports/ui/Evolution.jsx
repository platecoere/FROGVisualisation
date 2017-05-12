import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';
import TC from './TimeComponent.jsx';
import config from './config';
import utils from './utils';

import { Status } from '../api/events'

// -----------------------------------------------------------------
// TODO
// - nothing for the moment
// -----------------------------------------------------------------

const removeUndefSpeed = speed => !speed ? 1.0 : speed
const removeUndefState = state => !state ? 'Playing' : state

// const getStatus = (s, p) => p == 'Pausing' ? 0 : getStatusNoPausing(s)
const getStatus = (speed, state) => {
  const myState = removeUndefState(state)
  const mySpeed = removeUndefSpeed(speed)

  if (myState == 'Pausing') {
    return 0
  }

  return getStatusNoPausing(mySpeed)
}

const getStatusNoPausing = s => s < 1 ? 1 : (s > 1 ? 3 : 2)

const toWindow = (i, v) => Math.round(i/v) * v

const reachedEnd = x => Math.min(x, config.videoLength)

const Evolution = ({ myData, timeNow }) => {

  const d = [['ID', 'X', 'current status', '', 'size']]

  const windows = {};

  if (myData.length > 0) {

    myData.forEach(
      status => {
        const x = reachedEnd(toWindow(status.currentTime + utils.progress(status, timeNow), config.windowSizeEvolution))
        const y = getStatus(status.speed, status.state)

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
    x => Object.keys(windows[x]).forEach(
      y => {
        if (windows[x][y] > config.thresholdEvolution) {
          d.push(['', parseFloat(x), parseFloat(y), '', windows[x][y]])
        }
      }
    )
  )

  return(
    <div>
    <h1>Evolution</h1>
    {d.length > 2 && <Chart
      chartType="BubbleChart"
      data={d}
      options={{
        title: 'Evolution of the Students',
        hAxis: { title: 'Time', minValue: 0, maxValue: config.videoLength, gridlines: { count: 5, color: 'transparent' }, viewWindow: {min: 0, max : 800}}, // time axis
        vAxis: { title: 'Status', baseline: {}, ticks: [{v: 0, f: 'Pausing'}, {v: 1, f: 'Slow'}, {v: 2, f: 'Normal'}, {v: 3, f: 'Fast'}], minValue: -0.5, maxValue: 3.5},
        colors: ['#660198'],
        bubble: {opacity: '1.0'},
        enableInteractivity: 'true',
        backgroundColor: { fill:'transparent'},
        //backgroundColor: { fill:'white', stroke: 'black', strokeWidth: 2}
        fontSize: 16,

        //fontName: 'Avenir',
        chartArea: {width: '80%', height: '80%'},
        legend: { position: 'none'}
      }}
      width={'1400px'}
      height={'500px'}
    />}
  </div>);
}

const timeComponent = (props) => {
  return (<TC component={Evolution} interval={config.timeComponentInterval / config.accelerationFactor} props={props}/>)
}

export default createContainer(
  () => ({
    myData: Status.find().fetch()
  }),
  timeComponent
);

// var max = 0
// var current = 0

// if (now - status < 0) {
// console.log('now : ')
// console.log(now)
// console.log('timeStamp : ')
// console.log(status.timeStamp)
// console.log('diff : ')
// current = Math.abs(now - status.timeStamp)
// console.log(current)
// if (current > max) {
//   max = current
// }
// console.log(max)
// console.log('---------------------')
// }
