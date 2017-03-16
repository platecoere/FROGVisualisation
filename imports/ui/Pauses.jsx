import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';

export default class Pauses extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
      		data: [
          			['ID', 'X', 'Y', 'Nbr of Pauses'],
          			['',   3,  0,      1],
          			['',   6,  0,      5],
          			['',   10,  0,     4],
          			['',   14,  0,    10],
          			['',   17,  0,     5],
          			['',   20,  0,     2],
        	],
      		options: {
        	title: 'Number of Pauses during the Video',
        	hAxis: { title: 'Time', minValue: 0, maxValue: 20, gridlines: { count: 5 }},
        	vAxis: {minValue: 0, maxValue: 0, gridlines: { count: 0 }},
        	colorAxis: {colors: ['white', 'red']}
 			}
 		};
 	}      

	render() {
		return (
			<Chart
				chartType="BubbleChart"
				data={this.state.data}
				options={this.state.options}
				width={'1000px'}
        		height={'200px'}
			/>
		);
	}
}