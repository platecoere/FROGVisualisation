import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../api/events'

const PieChart = ({ numberPause, numberPlay, numberSeek }) => 
  <Chart
    chartType="PieChart"
    width="100%"
    data={[["type","n of event"],["Pause", numberPause],['Play', numberPlay],['Seek', numberSeek]]}
    options={{
      "title":"title",
      "is3D":false,
      "pieHole": 0.4,
      "slices": [{color: 'red'}, {color: 'green'}, {color: 'blue'}]
    }}
  />

export default createContainer(
  () => ({ 
    numberPause: Events.find({ EventType: 'Video.Pause' }).count(),
    numberPlay: Events.find({ EventType: 'Video.Play' }).count(),
    numberSeek: Events.find({ EventType: 'Video.Seek' }).count()
  }),
  PieChart
)

