import React from 'react';

import { BarChart } from 'react-d3';

var barData = [
  {label: 'A', value: 5},
  {label: 'B', value: 6},
  {label: 'F', value: 7}
];

/*
var barData = [
  { 
    "name": "Series A",
    "values": [
      { "x": 1, "y":  91},
      { "x": 2, "y":  90},
      { "x": 3, "y":  95},
      ...
  },
  { 
    "name": "Series B",
     "values": [ ... ]
  }
  ...
];
*/

const Hello = React.createClass({
    render: function() {
        return <BarChart
                  data={barData}
                  width={500}
                  height={200}
                  fill={'#3182bd'}
                  title='Bar Chart'
                />;
    }
});

export default Hello;