import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';
import TC from './TimeComponent.jsx'

import { Status } from '../api/events'


const Speed = ({ data, timeNow }) => {
  console.log(data)

  const number = {slow: 0, normal: 0, fast: 0}

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
  })

  console.log(number)

  return(
  <div>
    <p>Watching Speeds</p>
    <Chart
      chartType="PieChart"
      width="100%"
      data={[["type","n of event"],["Slow", number.slow],['Normal', number.normal], ['Fast', number.fast]]}
      options={{
        "title":"Proportions of Watching Speeds",
        "is3D":false,
        "pieHole": 0.4,
        "slices": [{color: 'red'}, {color: 'green'}, {color: 'blue'}]
      }}
    />
  </div>);
}

const T = (props) => {
  console.log(props)
  return (<TC component={Speed} interval={1000} props={props}/>)
}


export default createContainer(
  () => ({
    data: Status.find().fetch()
  }),
  T
);




