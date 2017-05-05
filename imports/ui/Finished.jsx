import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../api/events'

const PieChart = ({ notFinished, finished }) => 
  <Chart
    chartType="PieChart"
    width="100%"
    data={[["type","n of event"],["Pause", numberPause],['Play', numberPlay],['Seek', numberSeek]]}
    options={{
      "title":"title",
      "is3D":false,
      "slices": [{color: 'red'}, {color: 'green'}, {color: 'blue'}]
    }}
  />

export default createContainer(
  () => ({ 
    time: Events.find({ EventType: 'Video.Pause' }).count(),
    numberPlay: Events.find({ EventType: 'Video.Play' }).count(),
    numberSeek: Events.find({ EventType: 'Video.Seek' }).count()
  }),
  PieChart
)

/* students not watching :

- finished video
- abandonned watching

- on graph : nbr watching, nbr done watching, nbr that abandonned





*/