import React, { Component, PropTypes } from 'react';
import { Chart } from 'react-google-charts';

export default class FastForward extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
      		data: [
          		['ID', 'X', 'Y', 'Nbr of FastForward'],
          		['',   4,  0,      2],
                ['',   5,  0,      1],
                ['',   6,  0,      1],
                ['',   7,  0,      1],
                ['',   8,  0,      1],
                ['',   9,  0,      2],
                ['',   10,  0,      2],
                ['',   22,  0,      2],
                ['',   23,  0,      2],
                ['',   24,  0,      2],
                ['',   25,  0,      2],
                ['',   26,  0,      3],
                ['',   27,  0,      3],
                ['',   28,  0,      6],
                ['',   29,  0,      6],
                ['',   30,  0,      6],
                ['',   31,  0,      6],
                ['',   32,  0,      2],
                ['',   33,  0,      2],
                ['',   34,  0,      2],
                ['',   35,  0,      2],
                ['',   43,  0,      4],
                ['',   44,  0,      4],
                ['',   45,  0,      4],
                ['',   46,  0,      5],
                ['',   47,  0,      5],
        	],
      		options: {
        	title: 'Parts of Video watched with Faster Speed',
        	hAxis: { title: 'Time', minValue: 0, maxValue: 50, gridlines: { count: 5 }},
        	vAxis: {minValue: 0, maxValue: 0, gridlines: { count: 0 }},
        	colorAxis: {colors: ['White', 'Green']}
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