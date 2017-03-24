import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';

export default class WatchingSpeed extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
      		data: [["Speed","Number of Students"],["Slow",15],["Normal",62],["Fast",37]],
      		options: {
      			"title":"Average Watching Speed of Students (1)",
      			"is3D":false,
      			"slices": [{color: 'red'}, {color: 'green'}, {color: 'blue'}]
      		},
 		};
 	}      

	render() {
    	return (
    		<Chart
    	    	chartType="PieChart"
    	    	width="100%"
    	    	data={this.state.data}
    	    	options={this.state.options}
      		/>
    	);
  	}
}