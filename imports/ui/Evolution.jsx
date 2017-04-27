import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';
import TC from './TimeComponent.jsx';


import { Status } from '../api/events'


// Some numbers are negative - Math.abs(...) not enough
// NBR OF STUDENTS IN EACH TIME WINDOW !! --------------------

const progress = (status, now) => {

  console.log('hello')
  console.log(now)
  console.log(status.timeStamp)
  console.log(now - status.timeStamp)

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

const g = s => s < 1.0 ? 1 : (s > 1.0 ? 3 : 2)

const Evolution = ({ myData, timeNow }) => {
  //console.log(myData)
  /*myData.forEach( e => {
      if (parseFloat(e.speed) < 1.0) {
          e.tag = 1
       }
       if (parseFloat(e.speed) == 1.0) {
          e.tag = 2
       }
       if (parseFloat(e.speed) > 1.0) {
          e.tag = 3
       }
    }
  )*/

  const f = (s, p) => {
    if (p == 'Pausing') {
      return 0
    } else {
      return g(s)
    }
  }

  const d = [['ID', 'X', 'current status']]

  if (myData.length > 0) {
    myData.forEach(
      status => {
        d.push(['', status.currentTime + progress(status, timeNow), f(status.speed, status.state)])
      }
    )
  }



  //console.log(d)

  return(
    <div>
    <h1>Evolution</h1>
    <Chart
      chartType="BubbleChart"
      data={d}
      options={{
        title: 'Evolution of the Students',
        hAxis: { title: 'Time', minValue: 0, maxValue: 750, gridlines: { count: 10 }}, // time axis
        vAxis: { minValue: -1, maxValue: 0, gridlines: { count: 0 }},
        colorAxis: {colors: ['purple', 'red', 'green']}
      }}
      width={'1000px'}
      height={'600px'}
    />
  </div>);
}

/*export default createContainer(
  () => ({
    myData: Status.find().fetch(),
  }), Evolution );*/


const T = (props) => {
  //console.log(props)
  return (<TC component={Evolution} interval={5000} props={props}/>)
}


export default createContainer(
  () => ({
    myData: Status.find().fetch()
  }),
  T
);

/*
1
1
4
5
6
5
6
6
8
3
4
--
1, 2
4, 1
5, 2
6, 3
8, 1
3, 1
*/















