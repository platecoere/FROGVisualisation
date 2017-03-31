import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../api/events'
import { SlowSpeed } from '../api/events'
import { NormalSpeed } from '../api/events'
import { FastSpeed } from '../api/events'


const AreaChart = ({slow, normal, fast}) => {
  const d = [["Time","Slow","Normal", "Fast"]]
  if (slow && normal && fast) {
      Object.keys(data.data).forEach(
        (key, index) => d.push([
          '', slow.slow[key], normal.normal[key], fast.fast[key]
        ])
      )
  }

  <Chart
    chartType="AreaChart"
    width="100%"
    data={d}
    options={{
        "title":"Average Watching Speed of Students (2)",
        "isStacked":'relative',
        "colors":['red','green', 'blue']
      }}
  />
}

export default createContainer(
  () => ({
    slow: SlowSpeed.findOne(),
    normal: NormalSpeed.findOne(),
    fast: FastSpeed.findOne(),
  }), AreaChart );


/*
- We need to count the number of students
  watching @ speeds 1.0, 1.5 and 2.0
- Do that in events.js or here?
*/


/*export default class AreaChart extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
      		data: [
            ["Time","Slow","Normal", "Fast"],
            ["1",0,10,0],
            ["2",1,8,1],
            ["3",1,9,0],
            ["4",2,6,2],
            ["5",0,8,2],
            ["6",2,7,1],
            ["7",3,5,2],
            ["8",5,4,1],
            ["9",7,2,1],
            ["10",6,4,0],
            ["11",2,3,5],
            ["12",1,5,4],
            ["13",2,4,4],
            ["14",2,2,6],
            ["15",1,3,6]],
      		options1: {
      			"title":"Average Watching Speed of Students (2)",
      			"isStacked":'relative',
            "colors":['red','green', 'blue']
      		},
          options2: {
            "title":"Average Watching Speed of Students (2)",
            "isStacked":'true'
          },
 		};
 	}      

	render() {
    	return (
        <div>
    		  <Chart
    	      	chartType="AreaChart"
    	      	width="100%"
    	      	data={this.state.data}
    	      	options={this.state.options1}
      		/>
        </div>
    	);
  	}
}*/